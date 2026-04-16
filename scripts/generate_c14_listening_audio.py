from __future__ import annotations

import asyncio
import json
import shutil
import subprocess
import tempfile
from pathlib import Path

import edge_tts


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "assets" / "c14" / "listening" / "audio"
MANIFEST_PATH = OUT_DIR / "manifest.json"
FFMPEG = shutil.which("ffmpeg") or "ffmpeg"
FFPROBE = shutil.which("ffprobe") or "ffprobe"
OUTPUT_BITRATE = "192k"
OUTPUT_SAMPLE_RATE = 44100
OUTPUT_CHANNELS = 1
MASTER_FILTER = (
    "highpass=f=55,"
    "lowpass=f=9200,"
    "acompressor=threshold=-18dB:ratio=2.2:attack=10:release=120:makeup=1.7,"
    "loudnorm=I=-16:LRA=7:TP=-1.5"
)

VOICE_PRESETS = {
    "male": {
        "candidates": ["ko-KR-InJoonNeural", "ko-KR-HyunsuMultilingualNeural"],
        "rate": "-1%",
        "pitch": "-1Hz",
        "volume": "+2%",
    },
    "female": {
        "candidates": ["ko-KR-SunHiNeural", "ko-KR-HyunsuMultilingualNeural"],
        "rate": "-1%",
        "pitch": "+0Hz",
        "volume": "+3%",
    },
    "guide": {
        "candidates": ["ko-KR-SunHiNeural", "ko-KR-InJoonNeural"],
        "rate": "-2%",
        "pitch": "-1Hz",
        "volume": "+4%",
    },
}

VOICE_SELECTION_CACHE: dict[str, str] = {}

# Timing data was derived from the user's local textbook MP3s.
# The source files themselves are not stored in the repository.
TRACKS = [
    {
        "slug": "c14_track52_generated",
        "track_number": 52,
        "title": "Chapter 14 Listening 1 generated fallback",
        "original_duration": 99.246,
        "segments": [
            {"speaker": "안내", "voice": "guide", "start": 3.57, "end": 6.45, "text": "잘 듣고 질문에 답하세요."},
            {"speaker": "여", "voice": "female", "start": 7.01, "end": 9.67, "text": "고구마 좀 쪄 왔는데 드셔 보세요."},
            {"speaker": "여", "voice": "female", "start": 10.41, "end": 11.65, "text": "제가 직접 키운 거예요."},
            {"speaker": "남", "voice": "male", "start": 12.55, "end": 14.75, "text": "이걸 직접 키웠다고요?"},
            {"speaker": "여", "voice": "female", "start": 15.75, "end": 21.89, "text": "네. 얼마 전에 조카들하고 심었던 고구마인데 생각보다 잘 자랐어요."},
            {"speaker": "남", "voice": "male", "start": 22.95, "end": 27.41, "text": "아파트에 산다고 들었는데, 어디에서 고구마 농사를 지었어요?"},
            {"speaker": "여", "voice": "female", "start": 28.23, "end": 32.99, "text": "요즘 집 근처에서 하는 주말농장 프로그램에 참가하고 있어요."},
            {"speaker": "남", "voice": "male", "start": 34.19, "end": 36.85, "text": "주말농장이요? 그런 곳이 있어요?"},
            {"speaker": "여", "voice": "female", "start": 38.05, "end": 42.61, "text": "네. 은퇴 후에 시골에 가서 살 준비를 하는 사람들이나"},
            {"speaker": "여", "voice": "female", "start": 42.61, "end": 49.53, "text": "저처럼 농사를 짓고 싶어 하는 도시 사람들이 농사도 배우고 직접 키워 보기도 하는 곳이에요."},
            {"speaker": "남", "voice": "male", "start": 50.61, "end": 52.53, "text": "농사를 지어 보니까 어때요?"},
            {"speaker": "여", "voice": "female", "start": 53.55, "end": 56.09, "text": "배우면 배울수록 더 어려운 것 같아요."},
            {"speaker": "여", "voice": "female", "start": 56.89, "end": 61.33, "text": "하지만 도시에 살면서 자연을 느낄 수 있어서 참 좋아요."},
            {"speaker": "여", "voice": "female", "start": 61.79, "end": 64.77, "text": "그동안 쌓였던 스트레스도 풀리는 것 같고요."},
            {"speaker": "남", "voice": "male", "start": 65.61, "end": 72.37, "text": "그래요? 그런데 저처럼 도시에서만 살던 사람도 농사를 지을 수 있을까요?"},
            {"speaker": "여", "voice": "female", "start": 73.45, "end": 74.57, "text": "물론이지요."},
            {"speaker": "여", "voice": "female", "start": 75.23, "end": 80.23, "text": "저하고 같이 주말농장을 하는 사람들도 대부분 농사 경험이 없어요."},
            {"speaker": "여", "voice": "female", "start": 80.23, "end": 87.63, "text": "처음에는 좀 힘들겠지만 직접 심은 채소가 크는 걸 보면서 보람을 느낄 수 있을 거예요."},
            {"speaker": "여", "voice": "female", "start": 88.33, "end": 92.97, "text": "이번 주말에도 주말농장에 가니까 시간 되면 놀러 오세요."},
            {"speaker": "남", "voice": "male", "start": 93.71, "end": 95.21, "text": "그럼 그럴까요?"},
            {"speaker": "남", "voice": "male", "start": 96.05, "end": 97.35, "text": "구경해 보고 싶은데요."},
        ],
    },
    {
        "slug": "c14_track53_generated",
        "track_number": 53,
        "title": "Chapter 14 Listening 2 generated fallback",
        "original_duration": 90.124125,
        "segments": [
            {"speaker": "리포터", "voice": "guide", "start": 3.50, "end": 5.34, "text": "여러분 안녕하세요."},
            {"speaker": "리포터", "voice": "guide", "start": 5.86, "end": 11.02, "text": "저는 지금 70, 80년대 서울의 모습 전시회에 나와 있습니다."},
            {"speaker": "리포터", "voice": "guide", "start": 11.40, "end": 15.74, "text": "어린이날을 맞이해서 아이들과 함께 온 가족들이 많이 보이는데요."},
            {"speaker": "리포터", "voice": "guide", "start": 16.28, "end": 18.58, "text": "잠시 이야기를 나눠 보겠습니다."},
            {"speaker": "리포터", "voice": "guide", "start": 19.40, "end": 21.58, "text": "오늘 전시회에 와 보니까 어때요?"},
            {"speaker": "관람객", "voice": "female", "start": 22.44, "end": 27.50, "text": "부모님이 어렸을 때 살았던 동네를 사진으로 보니까 기분이 이상해요."},
            {"speaker": "관람객", "voice": "female", "start": 27.50, "end": 30.38, "text": "보면 볼수록 신기하고요."},
            {"speaker": "관람객", "voice": "female", "start": 30.38, "end": 35.88, "text": "또 청계천의 옛날 모습이 지금하고 하도 많이 달라서 깜짝 놀랐어요."},
            {"speaker": "관람객", "voice": "female", "start": 36.48, "end": 40.06, "text": "청계천이 차가 다니던 도로였다는 게 상상이 안 돼요."},
            {"speaker": "리포터", "voice": "guide", "start": 41.16, "end": 46.82, "text": "그렇군요. 부모님들이 어렸을 때 했던 놀이를 아이들에게 가르쳐 주는 것도 있는데요."},
            {"speaker": "리포터", "voice": "guide", "start": 47.58, "end": 48.50, "text": "한번 가보겠습니다."},
            {"speaker": "리포터", "voice": "guide", "start": 49.84, "end": 52.92, "text": "아버님, 열심히 팽이치기를 하고 계신데요."},
            {"speaker": "리포터", "voice": "guide", "start": 53.56, "end": 55.22, "text": "오늘 전시회가 어떠셨어요?"},
            {"speaker": "아버지", "voice": "male", "start": 56.22, "end": 63.04, "text": "우리가 어렸을 때 자주 하고 놀았던 놀이를 아이들하고 같이 해 볼 수 있어서 정말 좋았어요."},
            {"speaker": "아버지", "voice": "male", "start": 63.56, "end": 68.84, "text": "그동안 잊고 있었던 추억들이 생각나서 다시 어렸을 때로 돌아간 것 같아요."},
            {"speaker": "아버지", "voice": "male", "start": 69.80, "end": 72.76, "text": "하도 재미있어서 시간 가는 줄 몰랐어요."},
            {"speaker": "리포터", "voice": "guide", "start": 73.96, "end": 74.72, "text": "네, 감사합니다."},
            {"speaker": "리포터", "voice": "guide", "start": 75.64, "end": 78.98, "text": "이번 전시는 5월 한 달 동안 계속된다고 하니까"},
            {"speaker": "리포터", "voice": "guide", "start": 78.98, "end": 84.98, "text": "가족들과 특별한 추억을 만들고 싶으신 분들은 꼭 오셔서 관람하시기 바랍니다."},
            {"speaker": "리포터", "voice": "guide", "start": 85.56, "end": 88.04, "text": "지금까지 리포터 김현정이었습니다."},
        ],
    },
]


def ensure_binaries() -> None:
    if shutil.which("ffmpeg") is None:
        raise RuntimeError("ffmpeg is required but was not found in PATH.")
    if shutil.which("ffprobe") is None:
        raise RuntimeError("ffprobe is required but was not found in PATH.")


def ordered_candidates(preset_key: str) -> list[str]:
    cached = VOICE_SELECTION_CACHE.get(preset_key)
    candidates = VOICE_PRESETS[preset_key]["candidates"]
    if cached and cached in candidates:
        return [cached] + [candidate for candidate in candidates if candidate != cached]
    return list(candidates)


async def synthesize_segment(text: str, preset_key: str, output_path: Path) -> str:
    preset = VOICE_PRESETS[preset_key]
    last_error: Exception | None = None

    for candidate in ordered_candidates(preset_key):
        try:
            communicate = edge_tts.Communicate(
                text=text,
                voice=candidate,
                rate=preset["rate"],
                volume=preset["volume"],
                pitch=preset["pitch"],
            )
            await communicate.save(str(output_path))
            if output_path.exists() and output_path.stat().st_size > 0:
                VOICE_SELECTION_CACHE[preset_key] = candidate
                return candidate
        except Exception as error:  # noqa: BLE001
            last_error = error

    raise RuntimeError(f"Failed to synthesize segment with preset {preset_key}: {last_error}")


def run_command(command: list[str]) -> None:
    subprocess.run(command, check=True, capture_output=True)


def probe_duration(path: Path) -> float:
    result = subprocess.run(
        [
            FFPROBE,
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(path),
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    return float(result.stdout.strip())


def write_concat_list(files: list[Path], list_path: Path) -> None:
    lines = []
    for file_path in files:
        escaped = file_path.resolve().as_posix().replace("'", r"'\''")
        lines.append(f"file '{escaped}'")
    list_path.write_text("\n".join(lines), encoding="utf-8")


def make_silence_wav(path: Path, seconds: float) -> None:
    duration = max(0.0, seconds)
    run_command(
        [
            FFMPEG,
            "-y",
            "-f",
            "lavfi",
            "-i",
            f"anullsrc=r={OUTPUT_SAMPLE_RATE}:cl=mono",
            "-t",
            f"{duration:.6f}",
            "-ac",
            str(OUTPUT_CHANNELS),
            "-ar",
            str(OUTPUT_SAMPLE_RATE),
            "-c:a",
            "pcm_s16le",
            str(path),
        ]
    )


def render_natural_segment(source_path: Path, output_path: Path) -> None:
    run_command(
        [
            FFMPEG,
            "-y",
            "-i",
            str(source_path),
            "-ac",
            str(OUTPUT_CHANNELS),
            "-ar",
            str(OUTPUT_SAMPLE_RATE),
            "-c:a",
            "pcm_s16le",
            str(output_path),
        ]
    )


def concat_audio(parts: list[Path], output_path: Path, list_path: Path) -> None:
    write_concat_list(parts, list_path)
    run_command(
        [
            FFMPEG,
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(list_path),
            "-af",
            MASTER_FILTER,
            "-c:a",
            "libmp3lame",
            "-b:a",
            OUTPUT_BITRATE,
            "-ar",
            str(OUTPUT_SAMPLE_RATE),
            str(output_path),
        ]
    )


def build_gaps(track: dict) -> list[float]:
    gaps: list[float] = []
    cursor = 0.0
    for segment in track["segments"]:
        start = float(segment["start"])
        end = float(segment["end"])
        if start < cursor - 1e-6:
            raise ValueError(f"Segment overlaps previous segment in track {track['track_number']}: {segment}")
        gaps.append(max(0.0, start - cursor))
        cursor = end
    gaps.append(max(0.0, float(track["original_duration"]) - cursor))
    return gaps


async def build_track_audio(track: dict, temp_dir: Path) -> dict:
    parts: list[Path] = []
    segments_meta: list[dict] = []
    gaps = build_gaps(track)
    generated_cursor = 0.0

    for index, gap_seconds in enumerate(gaps[:-1]):
        if gap_seconds > 0.0005:
            silence_path = temp_dir / f"{track['slug']}_silence_{index:02d}.wav"
            make_silence_wav(silence_path, gap_seconds)
            parts.append(silence_path)
            generated_cursor += gap_seconds

        segment = track["segments"][index]
        raw_path = temp_dir / f"{track['slug']}_{index:02d}_raw.mp3"
        natural_path = temp_dir / f"{track['slug']}_{index:02d}_natural.wav"
        voice_used = await synthesize_segment(segment["text"], segment["voice"], raw_path)
        raw_duration = probe_duration(raw_path)
        render_natural_segment(raw_path, natural_path)
        rendered_duration = probe_duration(natural_path)
        generated_start = generated_cursor
        generated_end = generated_start + rendered_duration
        parts.append(natural_path)
        generated_cursor = generated_end
        segments_meta.append(
            {
                "speaker": segment["speaker"],
                "voice_preset": segment["voice"],
                "voice_used": voice_used,
                "text": segment["text"],
                "original_start": round(float(segment["start"]), 3),
                "original_end": round(float(segment["end"]), 3),
                "original_duration": round(float(segment["end"]) - float(segment["start"]), 3),
                "generated_start": round(generated_start, 3),
                "generated_end": round(generated_end, 3),
                "raw_duration": round(raw_duration, 3),
                "rendered_duration": round(rendered_duration, 3),
                "leading_silence": round(gap_seconds, 3),
                "raw_file": raw_path.name,
                "natural_file": natural_path.name,
            }
        )

    tail_gap = gaps[-1]
    if tail_gap > 0.0005:
        silence_path = temp_dir / f"{track['slug']}_silence_tail.wav"
        make_silence_wav(silence_path, tail_gap)
        parts.append(silence_path)

    output_path = OUT_DIR / f"{track['slug']}.mp3"
    concat_audio(parts, output_path, temp_dir / f"{track['slug']}_concat.txt")
    output_duration = probe_duration(output_path)

    return {
        "slug": track["slug"],
        "track_number": track["track_number"],
        "title": track["title"],
        "output": output_path.name,
        "original_duration": round(float(track["original_duration"]), 3),
        "generated_duration": round(output_duration, 3),
        "duration_delta": round(output_duration - float(track["original_duration"]), 3),
        "tail_silence": round(tail_gap, 3),
        "segments": segments_meta,
    }


async def main() -> None:
    ensure_binaries()
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    manifest = {
        "chapter": 14,
        "generated_with": "edge-tts + ffmpeg natural segment mastering",
        "bitrate": OUTPUT_BITRATE,
        "sample_rate": OUTPUT_SAMPLE_RATE,
        "channels": OUTPUT_CHANNELS,
        "timing_basis": "Original audio keeps textbook-derived timings; generated audio uses its own natural segment timings with original silence gaps.",
        "tracks": [],
    }

    with tempfile.TemporaryDirectory(prefix="c14_listening_audio_") as temp_root:
        temp_dir = Path(temp_root)
        for track in TRACKS:
            track_manifest = await build_track_audio(track, temp_dir)
            manifest["tracks"].append(track_manifest)
            print(
                f"created {track_manifest['output']} "
                f"({track_manifest['generated_duration']:.3f}s, "
                f"delta {track_manifest['duration_delta']:+.3f}s)"
            )

    MANIFEST_PATH.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"wrote {MANIFEST_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    asyncio.run(main())
