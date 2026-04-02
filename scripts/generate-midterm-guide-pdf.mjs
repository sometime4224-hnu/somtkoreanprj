import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const hubHtmlPath = path.join(rootDir, "midterm-exam", "index.html");
const assetsDir = path.join(rootDir, "midterm-exam", "guide-assets");
const homeShotPath = path.join(assetsDir, "midterm-hub-home.png");
const vocabularyShotPath = path.join(assetsDir, "midterm-hub-vocabulary.png");
const pdfPath = path.join(rootDir, "midterm-exam", "student-guide-vi.pdf");

async function waitForFonts(page) {
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  });
}

async function createHubShots(browser) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1600 },
    deviceScaleFactor: 2,
  });

  await page.goto(pathToFileURL(hubHtmlPath).href, { waitUntil: "domcontentloaded" });
  await waitForFonts(page);
  await page.waitForTimeout(1200);

  await page.locator(".hero").screenshot({ path: homeShotPath });
  await page.locator("#vocabulary").screenshot({ path: vocabularyShotPath });

  await page.close();
}

function buildGuideHtml(homeShotUrl, vocabularyShotUrl) {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Huong dan su dung Midterm Exam Hub</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --paper: #ffffff;
            --ink: #17324d;
            --muted: #5a7186;
            --line: #d6e0ea;
            --warm: #fff4e8;
            --soft-blue: #eef6ff;
            --soft-red: #fff1ef;
            --accent: #d94841;
            --accent-blue: #1d6fd7;
            --shadow: 0 18px 40px rgba(23, 50, 77, 0.10);
        }

        @page {
            size: A4;
            margin: 0;
        }

        * { box-sizing: border-box; }

        html,
        body {
            margin: 0;
            padding: 0;
            background:
                radial-gradient(circle at top left, rgba(255, 213, 174, 0.6), transparent 28%),
                radial-gradient(circle at bottom right, rgba(160, 208, 255, 0.45), transparent 28%),
                #eaf2f8;
            color: var(--ink);
            font-family: "Be Vietnam Pro", "Noto Sans KR", sans-serif;
        }

        body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        .page {
            position: relative;
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            padding: 14mm 14mm 13mm;
            background: var(--paper);
            overflow: hidden;
            page-break-after: always;
        }

        .page:last-child {
            page-break-after: auto;
        }

        .page::before,
        .page::after {
            content: "";
            position: absolute;
            border-radius: 999px;
            pointer-events: none;
        }

        .page::before {
            inset: 10mm auto auto -26mm;
            width: 78mm;
            height: 78mm;
            background: rgba(255, 224, 197, 0.72);
            filter: blur(12px);
        }

        .page::after {
            inset: auto -18mm 16mm auto;
            width: 70mm;
            height: 70mm;
            background: rgba(193, 225, 255, 0.62);
            filter: blur(14px);
        }

        .content {
            position: relative;
            z-index: 1;
        }

        .eyebrow {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 999px;
            background: rgba(217, 72, 65, 0.12);
            color: #b93831;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        h1,
        h2,
        h3,
        p {
            margin: 0;
        }

        h1 {
            margin-top: 10px;
            font-size: 28px;
            line-height: 1.18;
            letter-spacing: -0.02em;
        }

        h2 {
            font-size: 20px;
            line-height: 1.2;
            letter-spacing: -0.01em;
        }

        h3 {
            font-size: 15px;
            line-height: 1.3;
        }

        p,
        li {
            font-size: 11.7px;
            line-height: 1.72;
            color: var(--muted);
        }

        .lead {
            margin-top: 10px;
            max-width: 156mm;
            font-size: 13px;
            line-height: 1.82;
        }

        .hero-grid {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 12px;
            margin-top: 12px;
        }

        .card {
            background: rgba(255, 255, 255, 0.92);
            border: 1px solid rgba(214, 224, 234, 0.95);
            border-radius: 18px;
            box-shadow: var(--shadow);
        }

        .hero-panel {
            padding: 18px;
            background: linear-gradient(140deg, rgba(255, 244, 232, 0.95), rgba(238, 246, 255, 0.96));
        }

        .hero-panel .note {
            margin-top: 12px;
            padding: 11px 12px;
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.84);
            border: 1px solid rgba(214, 224, 234, 0.85);
        }

        .fact-list {
            display: grid;
            gap: 8px;
            padding: 18px;
        }

        .fact-item {
            padding: 12px 12px 11px;
            border-radius: 14px;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.97), rgba(248, 251, 255, 0.97));
            border: 1px solid rgba(214, 224, 234, 0.95);
        }

        .fact-item strong,
        .pill strong,
        .label-kr {
            color: var(--ink);
            font-family: "Noto Sans KR", "Be Vietnam Pro", sans-serif;
        }

        .label-kr {
            font-weight: 700;
        }

        .section {
            margin-top: 12px;
            padding: 16px;
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: end;
            gap: 10px;
        }

        .tiny {
            font-size: 10px;
            line-height: 1.55;
        }

        .pill-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-top: 12px;
        }

        .pill {
            padding: 14px 12px;
            border-radius: 16px;
            border: 1px solid rgba(214, 224, 234, 0.95);
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.97), rgba(247, 250, 255, 0.97));
        }

        .pill p {
            margin-top: 6px;
        }

        figure {
            margin: 0;
        }

        .shot {
            margin-top: 12px;
            padding: 10px;
            border-radius: 18px;
            border: 1px solid rgba(214, 224, 234, 0.95);
            background: rgba(248, 250, 252, 0.92);
            box-shadow: var(--shadow);
        }

        .shot img {
            display: block;
            width: 100%;
            border-radius: 12px;
            border: 1px solid rgba(214, 224, 234, 0.9);
        }

        .caption {
            margin-top: 7px;
            font-size: 10px;
            color: #698095;
        }

        .steps {
            display: grid;
            gap: 10px;
            margin-top: 12px;
        }

        .step {
            display: grid;
            grid-template-columns: 14mm 1fr;
            gap: 10px;
            padding: 12px;
            border-radius: 16px;
            border: 1px solid rgba(214, 224, 234, 0.95);
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.99), rgba(249, 252, 255, 0.96));
        }

        .step-num {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 14mm;
            height: 14mm;
            border-radius: 50%;
            background: linear-gradient(180deg, #ff8c66, #e85c4a);
            color: #fff;
            font-size: 12px;
            font-weight: 800;
        }

        .step h3 {
            margin-bottom: 4px;
        }

        .callout-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 12px;
        }

        .callout {
            padding: 14px;
            border-radius: 16px;
            border: 1px solid rgba(214, 224, 234, 0.95);
        }

        .callout.warm {
            background: var(--warm);
        }

        .callout.blue {
            background: var(--soft-blue);
        }

        .route {
            margin-top: 12px;
            padding: 14px 16px;
            border-radius: 18px;
            background: linear-gradient(135deg, rgba(255, 244, 232, 0.98), rgba(238, 246, 255, 0.98));
            border: 1px solid rgba(214, 224, 234, 0.95);
            box-shadow: var(--shadow);
        }

        .route-line {
            margin-top: 9px;
            padding: 10px 12px;
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.9);
            color: var(--ink);
            font-size: 12px;
            font-weight: 700;
            line-height: 1.7;
        }

        .study-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 12px;
        }

        .plan-card {
            padding: 16px;
            border-radius: 18px;
            border: 1px solid rgba(214, 224, 234, 0.95);
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 251, 255, 0.96));
            box-shadow: var(--shadow);
        }

        .plan-card ul,
        .tip-list {
            margin: 10px 0 0;
            padding-left: 18px;
        }

        .tip-list li,
        .plan-card li {
            margin-top: 4px;
        }

        .focus-strip {
            margin-top: 12px;
            padding: 14px 16px;
            border-radius: 18px;
            background: var(--soft-red);
            border: 1px solid rgba(248, 200, 196, 0.95);
        }

        .footer-note {
            margin-top: 14px;
            padding: 13px 15px;
            border-radius: 16px;
            background: linear-gradient(135deg, rgba(233, 246, 255, 0.98), rgba(255, 248, 239, 0.98));
            border: 1px solid rgba(214, 224, 234, 0.95);
            color: var(--ink);
            font-size: 11px;
            line-height: 1.75;
        }

        .footer-note strong {
            color: var(--accent-blue);
        }
    </style>
</head>
<body>
    <section class="page">
        <div class="content">
            <span class="eyebrow">Midterm Review Guide</span>
            <h1>Cach dung Midterm Exam Hub de on thi giua ky</h1>
            <p class="lead">
                Midterm Exam Hub la noi gom cac tai lieu hoc trong pham vi thi giua ky.
                Em co the vao day de <strong>on lai bai da hoc</strong>, xem tu vung, ngu phap,
                bai doc va bai viet ma khong can mo nhieu trang rieng.
            </p>

            <div class="hero-grid">
                <div class="card hero-panel">
                    <h2>Midterm Exam Hub la gi?</h2>
                    <p class="lead" style="margin-top: 8px; max-width: none; font-size: 11.8px;">
                        Day khong phai la mot bai hoc moi. Day la <strong>trung tam on tap</strong>.
                        Cac tai lieu cua nhung bai co trong pham vi thi duoc sap xep lai de em xem nhanh,
                        luyen lai va kiem tra muc do hieu bai cua minh.
                    </p>
                    <div class="note">
                        <p>
                            Trong hub hien tai, pham vi duoc hien thi la <strong>bai 10 den bai 13</strong>
                            va <strong>Review 4</strong>. Em nen dung hub nay de on lai nhung noi dung da hoc tren lop.
                        </p>
                    </div>
                </div>

                <div class="card fact-list">
                    <div class="fact-item">
                        <h3>Em se tim thay gi o day?</h3>
                        <p>Tu vung, ngu phap, bai doc, bai viet, quiz, game va mot so muc danh gia nhanh.</p>
                    </div>
                    <div class="fact-item">
                        <h3>Hub giup em nhu the nao?</h3>
                        <p>Em khong can tim tung bai mot. Moi thu da duoc gom vao cung mot trang de on tap de dang hon.</p>
                    </div>
                    <div class="fact-item">
                        <h3>Khi nao nen dung?</h3>
                        <p>Sau gio hoc, truoc bai kiem tra nho, va dac biet la truoc ki thi giua ky.</p>
                    </div>
                </div>
            </div>

            <div class="card section">
                <div class="section-header">
                    <h2>4 khu vuc chinh trong hub</h2>
                    <p class="tiny">Cac ten menu goc duoc giu lai bang tieng Han de em de tim tren man hinh.</p>
                </div>
                <div class="pill-grid">
                    <div class="pill">
                        <strong><span class="label-kr">어휘</span> | Tu vung</strong>
                        <p>On lai tu moi theo tung bai va lam quiz de nho lau hon.</p>
                    </div>
                    <div class="pill">
                        <strong><span class="label-kr">문법</span> | Ngu phap</strong>
                        <p>Xem lai mau cau, cach dung va lam bai luyen hoac game nho.</p>
                    </div>
                    <div class="pill">
                        <strong><span class="label-kr">읽기</span> | Doc</strong>
                        <p>Luyen doc hieu de kiem tra xem em co that su hieu noi dung hay khong.</p>
                    </div>
                    <div class="pill">
                        <strong><span class="label-kr">쓰기</span> | Viet</strong>
                        <p>Luyen viet theo tranh va viet theo dang giong bai thi giua ky.</p>
                    </div>
                </div>
            </div>

            <figure class="shot">
                <img src="${homeShotUrl}" alt="Anh chup man hinh dau cua Midterm Exam Hub">
                <figcaption class="caption">
                    Man hinh dau cua hub. Em co the xem pham vi thi va bam vao menu nhu <span class="label-kr">어휘</span>,
                    <span class="label-kr">문법</span>, <span class="label-kr">읽기</span>, <span class="label-kr">쓰기</span>.
                </figcaption>
            </figure>
        </div>
    </section>

    <section class="page">
        <div class="content">
            <span class="eyebrow">Step By Step</span>
            <h1>Cach su dung hub tung buoc</h1>
            <p class="lead">
                Neu em chua biet nen bat dau tu dau, em chi can lam theo thu tu duoi day.
                Cach nay don gian va phu hop cho viec on tap truoc thi.
            </p>

            <div class="steps">
                <div class="step">
                    <div class="step-num">1</div>
                    <div>
                        <h3>Mo hub va xem pham vi thi</h3>
                        <p>Tren man hinh dau, em nhin xem bai nao nam trong pham vi thi. Hub hien tai gom bai 10-13 va Review 4.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-num">2</div>
                    <div>
                        <h3>Chon khu vuc em muon on</h3>
                        <p>Neu em muon on tu moi, bam <span class="label-kr">어휘</span>. Neu muon on mau cau, bam <span class="label-kr">문법</span>. Neu muon luyen doc hoac viet, bam <span class="label-kr">읽기</span> hoac <span class="label-kr">쓰기</span>.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-num">3</div>
                    <div>
                        <h3>Chon dung bai hoc</h3>
                        <p>Sau khi vao mot khu vuc, em chon bai 10, 11, 12, 13 hoac Review 4. Nen on tung bai mot de khong bi roi.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-num">4</div>
                    <div>
                        <h3>Xem lai noi dung co ban truoc</h3>
                        <p>Voi tu vung, xem the tu va nghia. Voi ngu phap, doc lai giai thich va vi du. Day la buoc nho lai kien thuc.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-num">5</div>
                    <div>
                        <h3>Lam quiz, game hoac muc kiem tra</h3>
                        <p>Sau khi xem lai, em nen lam bai luyen nhu quiz, card game, <span class="label-kr">확인하기</span> hoac <span class="label-kr">평가하기</span>. Buoc nay giup em biet minh da nho bai chua.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-num">6</div>
                    <div>
                        <h3>Luyen doc va viet de chot bai</h3>
                        <p>Khi da on tu vung va ngu phap, em chuyen sang bai doc va bai viet. Day la luc em ap dung kien thuc that su, giong cach lam bai thi hon.</p>
                    </div>
                </div>
            </div>

            <div class="callout-grid">
                <div class="callout warm">
                    <h3>Dieu can nho</h3>
                    <p>Hub nay dung de <strong>on tap</strong>. Neu em chua hoc mot noi dung nao tren lop, em nen hoc bai co ban truoc roi quay lai hub de luyen them.</p>
                </div>
                <div class="callout blue">
                    <h3>Khi em yeu mot phan</h3>
                    <p>Neu em thay phan nao kho, hay vao dung muc do nhieu lan hon. Vi du: tu vung yeu thi lam lai the tu va quiz; viet yeu thi lam lai bai viet.</p>
                </div>
            </div>

            <div class="route">
                <h2>Vi du mot lo trinh on nhanh cho Bai 10</h2>
                <p class="lead" style="margin-top: 6px; font-size: 11.5px; max-width: none;">Em co the di theo thu tu nay de on mot bai cho gon va hieu qua:</p>
                <div class="route-line">
                    <span class="label-kr">어휘 카드</span> → <span class="label-kr">복습 퀴즈</span> →
                    <span class="label-kr">문법 1~4</span> → <span class="label-kr">읽기</span> →
                    <span class="label-kr">컷 쓰기</span>
                </div>
            </div>

            <figure class="shot">
                <img src="${vocabularyShotUrl}" alt="Anh chup mot khu vuc trong Midterm Exam Hub">
                <figcaption class="caption">
                    Vi du ve mot khu vuc trong hub. Em chi can chon bai can on, sau do bam vao tai lieu phu hop.
                </figcaption>
            </figure>
        </div>
    </section>

    <section class="page">
        <div class="content">
            <span class="eyebrow">Study Routine</span>
            <h1>Thu tu on tap de de nho va de theo</h1>
            <p class="lead">
                Em khong can hoc tat ca trong mot lan. Tot hon la chia nho viec on tap,
                hoc deu tung phan va quay lai phan minh lam sai.
            </p>

            <div class="study-grid">
                <div class="plan-card">
                    <h2>Khi em khong co nhieu thoi gian</h2>
                    <ul>
                        <li>Bat dau tu muc <span class="label-kr">핵심 대비</span> de xem phan quan trong.</li>
                        <li>On nhanh tu vung va ngu phap cua bai em yeu nhat.</li>
                        <li>Lam mot quiz hoac mot muc <span class="label-kr">평가하기</span>.</li>
                        <li>Cuoi cung, lam mot bai viet dang thi nhu <span class="label-kr">중간고사형 쓰기</span>.</li>
                    </ul>
                </div>
                <div class="plan-card">
                    <h2>Khi em co du thoi gian</h2>
                    <ul>
                        <li>Moi ngay on 1 bai: bai 10 → bai 11 → bai 12 → bai 13.</li>
                        <li>Moi bai nen di theo thu tu: tu vung → ngu phap → doc → viet.</li>
                        <li>Sau khi hoc xong 4 bai, vao Review 4 de tong on.</li>
                        <li>Lam lai cac muc em tung lam sai de nho lau hon.</li>
                    </ul>
                </div>
            </div>

            <div class="focus-strip">
                <h2>Nhung muc dac biet nen uu tien</h2>
                <p class="lead" style="margin-top: 6px; max-width: none; font-size: 11.5px;">Trong hub hien tai co mot so muc rat co ich truoc thi:</p>
                <ul class="tip-list">
                    <li><span class="label-kr">Review 4 집중</span>: giup em xem lai phan trong tam.</li>
                    <li><span class="label-kr">퀴즈</span> va game: giup kiem tra tri nho mot cach nhanh.</li>
                    <li><span class="label-kr">읽기와 쓰기</span>: giup em thay cach dung kien thuc trong bai tap tong hop.</li>
                    <li><span class="label-kr">중간고사형 쓰기</span>: rat giong cach luyen truoc bai thi viet.</li>
                </ul>
            </div>

            <div class="plan-card" style="margin-top: 12px;">
                <h2>Meo de dung hub hieu qua</h2>
                <ul class="tip-list">
                    <li>Khong chi xem. Hay bam vao bai luyen va tu lam.</li>
                    <li>Neu sai, hay xem lai ngay va lam lai them mot lan nua.</li>
                    <li>Doc thanh tieng o phan doc va viet de quen mat chu, tu va cau.</li>
                    <li>Ghi ra 5-10 tu hoac mau cau em hay quen roi xem lai truoc khi ngu.</li>
                    <li>Neu khong hieu trang nao, hay ghi ten bai hoac ten muc roi hoi giao vien.</li>
                </ul>
            </div>

            <div class="footer-note">
                <strong>Tom lai:</strong> Midterm Exam Hub la noi gom tai lieu cua cac bai nam trong pham vi thi.
                Em dung hub de on lai kien thuc da hoc, luyen them, va kiem tra xem minh da san sang cho thi giua ky chua.
                On deu tung ngay se de nho hon la hoc don vao mot luc.
            </div>
        </div>
    </section>
</body>
</html>`;
}

async function createPdf(browser) {
  const page = await browser.newPage({
    viewport: { width: 1240, height: 1754 },
    deviceScaleFactor: 2,
  });

  const homeShotUrl = pathToFileURL(homeShotPath).href;
  const vocabularyShotUrl = pathToFileURL(vocabularyShotPath).href;

  await page.setContent(buildGuideHtml(homeShotUrl, vocabularyShotUrl), {
    waitUntil: "domcontentloaded",
  });
  await waitForFonts(page);
  await page.waitForTimeout(1200);

  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
    },
  });

  await page.close();
}

async function main() {
  await fs.mkdir(assetsDir, { recursive: true });

  const browser = await chromium.launch();

  try {
    await createHubShots(browser);
    await createPdf(browser);
  } finally {
    await browser.close();
  }

  await fs.rm(assetsDir, { recursive: true, force: true });

  console.log(`PDF created: ${pdfPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
