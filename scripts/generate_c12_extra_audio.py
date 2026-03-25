import asyncio
import json
import shutil
import subprocess
import sys
import tempfile
import time
from pathlib import Path

import edge_tts


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "assets" / "c12" / "audio" / "extra"
MANIFEST_PATH = OUTPUT_DIR / "manifest.json"
FFMPEG = shutil.which("ffmpeg") or "ffmpeg"
FFPROBE = shutil.which("ffprobe") or "ffprobe"
SAMPLE_RATE = 24000
OUTPUT_BITRATE = "160k"

MASTER_FILTERS = {
    "dialogue": (
        "highpass=f=55,"
        "lowpass=f=9200,"
        "acompressor=threshold=-18dB:ratio=2.2:attack=10:release=110:makeup=1.6,"
        "loudnorm=I=-16:LRA=7:TP=-1.5"
    ),
    "narration": (
        "highpass=f=60,"
        "lowpass=f=9000,"
        "acompressor=threshold=-19dB:ratio=1.8:attack=12:release=150:makeup=1.3,"
        "loudnorm=I=-16:LRA=6:TP=-1.5"
    ),
}

VOICE_PRESETS = {
    "male": {
        "candidates": ["ko-KR-HyunsuNeural", "ko-KR-HyunsuMultilingualNeural"],
        "rate": "-4%",
        "pitch": "-2Hz",
        "volume": "+1%",
    },
    "female": {
        "candidates": ["en-US-AvaMultilingualNeural"],
        "rate": "-5%",
        "pitch": "+0Hz",
        "volume": "+2%",
    },
    "narrator_m": {
        "candidates": ["ko-KR-HyunsuNeural", "ko-KR-HyunsuMultilingualNeural"],
        "rate": "-8%",
        "pitch": "-3Hz",
        "volume": "+3%",
    },
    "narrator_f": {
        "candidates": ["en-US-AvaMultilingualNeural"],
        "rate": "-7%",
        "pitch": "+0Hz",
        "volume": "+3%",
    },
}

TRACK_PROFILES = {
    "short_dialogue": {
        "gap_seconds": 0.38,
        "master_filter": MASTER_FILTERS["dialogue"],
        "rate_shift": "+1%",
        "volume_shift": "+0%",
    },
    "radio": {
        "gap_seconds": 0.0,
        "master_filter": MASTER_FILTERS["narration"],
        "rate_shift": "-1%",
        "volume_shift": "+1%",
    },
    "column": {
        "gap_seconds": 0.0,
        "master_filter": MASTER_FILTERS["narration"],
        "rate_shift": "+0%",
        "volume_shift": "+1%",
    },
    "long_dialogue": {
        "gap_seconds": 0.44,
        "master_filter": MASTER_FILTERS["dialogue"],
        "rate_shift": "+0%",
        "volume_shift": "+0%",
    },
}

VOICE_SELECTION_CACHE = {}


TRACKS = [
    {
        "slug": "c12_extra_01_short_dialogue_01",
        "title": "짧은 남녀 대화 1",
        "profile": "short_dialogue",
        "segments": [
            {"speaker": "남", "voice": "male", "text": "수아 씨, 요즘 자세가 좋아졌어요."},
            {"speaker": "여", "voice": "female", "text": "네, 아침마다 목을 천천히 돌리고 가슴을 폈더니 몸이 가벼워졌어요."},
            {"speaker": "남", "voice": "male", "text": "정말요? 얼굴도 밝아 보여요."},
            {"speaker": "여", "voice": "female", "text": "네, 기분이 상쾌해서 학교에 와도 덜 지쳐요."},
        ],
    },
    {
        "slug": "c12_extra_02_short_dialogue_02",
        "title": "짧은 남녀 대화 2",
        "profile": "short_dialogue",
        "segments": [
            {"speaker": "여", "voice": "female", "text": "민호 씨, 왜 숨이 차요?"},
            {"speaker": "남", "voice": "male", "text": "계단을 빨리 올라왔어요. 요즘은 조금만 뛰어도 금방 힘들어요."},
            {"speaker": "여", "voice": "female", "text": "운동하기 전에 다리를 벌리고 팔을 뻗어야 해요."},
            {"speaker": "남", "voice": "male", "text": "오늘 아침에 그렇게 했더니 몸이 한결 편했어요."},
        ],
    },
    {
        "slug": "c12_extra_03_short_dialogue_03",
        "title": "짧은 남녀 대화 3",
        "profile": "short_dialogue",
        "segments": [
            {"speaker": "남", "voice": "male", "text": "지연 씨, 오늘은 왜 천천히 걸어요?"},
            {"speaker": "여", "voice": "female", "text": "어제 오래 걸었더니 다리에 쥐가 났어요."},
            {"speaker": "남", "voice": "male", "text": "많이 아픈 모양이에요. 얼굴도 안 좋아 보여요."},
            {"speaker": "여", "voice": "female", "text": "네, 그래서 오늘은 좀 쉴 거예요."},
        ],
    },
    {
        "slug": "c12_extra_04_short_dialogue_04",
        "title": "짧은 남녀 대화 4",
        "profile": "short_dialogue",
        "segments": [
            {"speaker": "여", "voice": "female", "text": "선생님, 저는 요즘 운동을 시작했어요."},
            {"speaker": "남", "voice": "male", "text": "그래요? 몸이 좀 달라졌어요?"},
            {"speaker": "여", "voice": "female", "text": "네, 팔을 자주 뻗고 몸을 젖혔더니 근육이 생겼어요. 운동이 얼마나 중요한지 몰라요."},
            {"speaker": "남", "voice": "male", "text": "잘했어요. 계속하면 힘이 더 세져요."},
        ],
    },
    {
        "slug": "c12_extra_05_short_dialogue_05",
        "title": "짧은 남녀 대화 5",
        "profile": "short_dialogue",
        "segments": [
            {"speaker": "남", "voice": "male", "text": "선생님, 오래 앉아 있으면 몸이 무거워요."},
            {"speaker": "여", "voice": "female", "text": "그럼 쉬는 시간마다 일어나야 해요. 손을 허리에 대고 옆구리를 굽혀 보세요."},
            {"speaker": "남", "voice": "male", "text": "오늘 수업 전에 그렇게 했더니 기운이 났어요."},
            {"speaker": "여", "voice": "female", "text": "좋아요. 그렇게 하면 자세도 좋아져요."},
        ],
    },
    {
        "slug": "c12_extra_06_radio_broadcast",
        "title": "라디오 방송 듣기",
        "profile": "radio",
        "segments": [
            {
                "speaker": "진행",
                "voice": "narrator_m",
                "text": "안녕하세요. 아침 건강 시간입니다. 요즘 학교나 회사에서 오래 앉아 있는 사람이 많습니다. 그래서 목이 아프고 몸이 무겁다고 말하는 사람이 많아요. 아침에 목을 천천히 돌리고 가슴을 펴 보세요. 이렇게 했더니 자세가 좋아졌다는 사람도 많습니다. 얼굴이 피곤해 보이고 하품을 자주 하면 많이 지친 것일 수 있습니다. 그럴 때는 바로 어려운 운동을 하지 마세요. 먼저 팔을 뻗고 몸을 젖혀 스트레칭을 하세요. 그리고 짧게 걸으면 기분이 얼마나 상쾌한지 모릅니다. 오늘도 쉬운 동작부터 시작해 보세요.",
            }
        ],
    },
    {
        "slug": "c12_extra_07_column",
        "title": "칼럼 듣기",
        "profile": "column",
        "segments": [
            {
                "speaker": "필자",
                "voice": "narrator_f",
                "text": "안녕하세요. 저는 학교 보건실에서 일하는 김소라입니다. 요즘 목이 아프다고 말하는 학생이 많습니다. 고개를 숙이고 휴대폰을 오래 보면 목이 아플 수 있습니다. 오늘도 복도에서도 고개를 숙이고 휴대폰을 하고 있는 학생을 많이 봤습니다. 이런 자세는 목에 좋지 않습니다. 목이 좋아지려면 쉬는 시간마다 자리에서 일어나야 합니다. 그리고 손을 허리에 대고 가슴을 펴는 연습을 해야 합니다. 처음에는 귀찮지만, 며칠만 해도 몸이 얼마나 가벼운지 모릅니다. 작은 습관이 자세를 바꿉니다.",
            }
        ],
    },
    {
        "slug": "c12_extra_08_long_dialogue",
        "title": "남녀 긴 대화",
        "profile": "long_dialogue",
        "segments": [
            {"speaker": "남", "voice": "male", "text": "선생님, 요즘 몸이 무겁고 숨이 자주 차요. 지난달부터 운동을 안 했더니 살도 조금 쪘어요."},
            {"speaker": "여", "voice": "female", "text": "얼굴을 보니까 많이 지친 모양이에요. 하루에 많이 걸어요?"},
            {"speaker": "남", "voice": "male", "text": "거의 안 걸어요. 집에 가면 바로 앉아서 쉬어요. 그런데 어제는 목을 돌리고 가슴을 폈더니 기분이 상쾌했어요."},
            {"speaker": "여", "voice": "female", "text": "잘하셨어요. 몸이 좋아지려면 아침마다 10분은 꼭 움직여야 해요. 손을 허리에 대고 옆구리를 굽히는 동작도 하세요."},
            {"speaker": "남", "voice": "male", "text": "네. 저는 조금만 움직여도 땀이 많이 나요. 그래서 제 몸이 얼마나 약해졌는지 모르겠어요."},
            {"speaker": "여", "voice": "female", "text": "처음에는 다 그래요. 하지만 다리를 벌리고 팔을 뻗는 동작을 매일 하면 기운이 나고 근육도 생겨요."},
            {"speaker": "남", "voice": "male", "text": "알겠습니다. 그럼 오늘부터 집에서 해 볼게요."},
            {"speaker": "여", "voice": "female", "text": "좋아요. 일주일만 해도 몸이 훨씬 가벼워지고 자세도 좋아져요."},
        ],
    },
]


def run(cmd):
    completed = subprocess.run(cmd, capture_output=True, text=True)
    if completed.returncode != 0:
        raise RuntimeError(
            "Command failed:\n"
            + " ".join(str(part) for part in cmd)
            + "\nSTDOUT:\n"
            + completed.stdout
            + "\nSTDERR:\n"
            + completed.stderr
        )
    return completed


def ensure_tools():
    if shutil.which("ffmpeg") is None:
        raise RuntimeError("ffmpeg is required but was not found in PATH.")
    if shutil.which("ffprobe") is None:
        raise RuntimeError("ffprobe is required but was not found in PATH.")


def parse_signed_value(value, suffix):
    clean = str(value).strip()
    if not clean.endswith(suffix):
        raise ValueError(f"Expected value ending with {suffix}: {value}")
    return float(clean[: -len(suffix)] or 0)


def combine_signed_values(base, delta, suffix):
    result = parse_signed_value(base, suffix) + parse_signed_value(delta, suffix)
    if suffix == "%":
        return f"{result:+.0f}%"
    if suffix == "Hz":
        return f"{result:+.0f}Hz"
    raise ValueError(f"Unsupported suffix: {suffix}")


def ordered_candidates(preset_key):
    cached = VOICE_SELECTION_CACHE.get(preset_key)
    candidates = VOICE_PRESETS[preset_key]["candidates"]
    if cached and cached in candidates:
        return [cached] + [candidate for candidate in candidates if candidate != cached]
    return list(candidates)


async def synthesize_with_retry(text, preset_key, output_path, track_profile, retries_per_voice=2):
    preset = VOICE_PRESETS[preset_key]
    rate = combine_signed_values(preset["rate"], track_profile["rate_shift"], "%")
    volume = combine_signed_values(preset["volume"], track_profile["volume_shift"], "%")
    pitch = preset["pitch"]
    last_error = None

    for candidate in ordered_candidates(preset_key):
        for attempt in range(1, retries_per_voice + 1):
            try:
                communicate = edge_tts.Communicate(
                    text=text,
                    voice=candidate,
                    rate=rate,
                    volume=volume,
                    pitch=pitch,
                    boundary="SentenceBoundary",
                )
                await communicate.save(str(output_path))
                if output_path.exists() and output_path.stat().st_size > 0:
                    VOICE_SELECTION_CACHE[preset_key] = candidate
                    return {
                        "voice": candidate,
                        "rate": rate,
                        "volume": volume,
                        "pitch": pitch,
                    }
            except Exception as exc:  # noqa: BLE001
                last_error = exc
                await asyncio.sleep(min(1.5 * attempt, 4))

    raise RuntimeError(f"Failed to synthesize with preset {preset_key}: {last_error}")


def make_silence_wav(path, seconds):
    run(
        [
            FFMPEG,
            "-y",
            "-f",
            "lavfi",
            "-i",
            f"anullsrc=channel_layout=mono:sample_rate={SAMPLE_RATE}",
            "-t",
            str(seconds),
            "-c:a",
            "pcm_s16le",
            str(path),
        ]
    )


def convert_to_wav(src, dest):
    run(
        [
            FFMPEG,
            "-y",
            "-i",
            str(src),
            "-ar",
            str(SAMPLE_RATE),
            "-ac",
            "1",
            "-c:a",
            "pcm_s16le",
            str(dest),
        ]
    )


def concat_wavs(parts, output_mp3, master_filter):
    with tempfile.TemporaryDirectory() as tmpdir:
        concat_file = Path(tmpdir) / "concat.txt"
        lines = []
        for part in parts:
            escaped = str(part).replace("'", r"'\''")
            lines.append(f"file '{escaped}'")
        concat_file.write_text("\n".join(lines), encoding="utf-8")
        run(
            [
                FFMPEG,
                "-y",
                "-f",
                "concat",
                "-safe",
                "0",
                "-i",
                str(concat_file),
                "-af",
                master_filter,
                "-c:a",
                "libmp3lame",
                "-b:a",
                OUTPUT_BITRATE,
                str(output_mp3),
            ]
        )


def probe_duration(path):
    result = run(
        [
            FFPROBE,
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=noprint_wrappers=1:nokey=1",
            str(path),
        ]
    )
    try:
        return round(float(result.stdout.strip()), 2)
    except ValueError:
        return None


async def generate_track(track, workdir):
    track_profile = TRACK_PROFILES[track["profile"]]
    gap_seconds = track_profile["gap_seconds"]
    wav_parts = []
    voices_used = {}
    segment_settings = []
    silence_wav = None

    if gap_seconds > 0 and len(track["segments"]) > 1:
        silence_wav = workdir / f"silence_{str(gap_seconds).replace('.', '_')}.wav"
        make_silence_wav(silence_wav, gap_seconds)

    for index, segment in enumerate(track["segments"], start=1):
        segment_mp3 = workdir / f"{track['slug']}_{index:02d}.mp3"
        segment_wav = workdir / f"{track['slug']}_{index:02d}.wav"
        synthesis_info = await synthesize_with_retry(segment["text"], segment["voice"], segment_mp3, track_profile)
        convert_to_wav(segment_mp3, segment_wav)
        wav_parts.append(segment_wav)
        voices_used[segment["voice"]] = synthesis_info["voice"]
        segment_settings.append(
            {
                "speaker": segment["speaker"],
                "voice_preset": segment["voice"],
                "voice_used": synthesis_info["voice"],
                "rate": synthesis_info["rate"],
                "pitch": synthesis_info["pitch"],
                "volume": synthesis_info["volume"],
            }
        )
        if silence_wav and index != len(track["segments"]):
            wav_parts.append(silence_wav)

    output_mp3 = OUTPUT_DIR / f"{track['slug']}.mp3"
    concat_wavs(wav_parts, output_mp3, track_profile["master_filter"])
    return {
        "slug": track["slug"],
        "title": track["title"],
        "profile": track["profile"],
        "file": output_mp3.name,
        "duration_seconds": probe_duration(output_mp3),
        "segment_count": len(track["segments"]),
        "gap_seconds": gap_seconds,
        "master_filter": track_profile["master_filter"],
        "voices_used": voices_used,
        "segment_settings": segment_settings,
    }


async def main():
    ensure_tools()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    started = time.time()
    results = []

    with tempfile.TemporaryDirectory() as tmpdir:
        tmp_path = Path(tmpdir)
        for track in TRACKS:
            track_dir = tmp_path / track["slug"]
            track_dir.mkdir(parents=True, exist_ok=True)
            print(f"[generate] {track['title']}")
            result = await generate_track(track, track_dir)
            results.append(result)

    manifest = {
        "generated_at_epoch": int(time.time()),
        "generator": "scripts/generate_c12_extra_audio.py",
        "sample_rate": SAMPLE_RATE,
        "output_bitrate": OUTPUT_BITRATE,
        "voice_presets": VOICE_PRESETS,
        "track_profiles": TRACK_PROFILES,
        "tracks": results,
        "elapsed_seconds": round(time.time() - started, 2),
    }
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[done] wrote {len(results)} files to {OUTPUT_DIR}")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        sys.exit(130)
