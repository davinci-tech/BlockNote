import { ImageResponse } from "@vercel/og";
import React from "react";

export const config = {
  runtime: "edge",
};

const font = fetch(
  new URL("../docs/public/fonts/Gilroy-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(request: { url: string }) {
  try {
    const { searchParams } = new URL(request.url);
    let title = searchParams.get("title");
    if (title && title.length > 100) {
      title = title.slice(0, 99) + "…";
    }

    const fontData = await font;

    const bannerSVG = (
      <svg
        width="938"
        height="172"
        viewBox="0 0 469 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M118.411 67.2259V21.9073H140.552C146.249 21.9073 150.522 22.9863 153.371 25.1443C156.262 27.3023 157.708 30.1509 157.708 33.6901C157.708 36.0639 157.126 38.1357 155.96 39.9052C154.795 41.6317 153.198 42.9696 151.169 43.9192C149.141 44.8687 146.81 45.3435 144.177 45.3435L145.408 42.6891C148.256 42.6891 150.781 43.1639 152.982 44.1134C155.183 45.0198 156.888 46.3793 158.097 48.1921C159.348 50.0048 159.974 52.2276 159.974 54.8604C159.974 58.7448 158.442 61.7877 155.378 63.9888C152.313 66.1469 147.803 67.2259 141.847 67.2259H118.411ZM128.834 59.3275H141.07C143.789 59.3275 145.839 58.8959 147.22 58.0327C148.645 57.1263 149.357 55.702 149.357 53.7598C149.357 51.8607 148.645 50.458 147.22 49.5516C145.839 48.6021 143.789 48.1273 141.07 48.1273H128.057V40.4879H139.257C141.804 40.4879 143.746 40.0563 145.084 39.1931C146.465 38.2867 147.156 36.9272 147.156 35.1144C147.156 33.3448 146.465 32.0284 145.084 31.1652C143.746 30.2588 141.804 29.8057 139.257 29.8057H128.834V59.3275ZM167.202 67.2259V19.1882H177.302V67.2259H167.202ZM203.249 67.7438C199.537 67.7438 196.235 66.9669 193.344 65.4131C190.495 63.8594 188.229 61.7445 186.546 59.0685C184.906 56.3494 184.086 53.2634 184.086 49.8106C184.086 46.3146 184.906 43.2286 186.546 40.5526C188.229 37.8335 190.495 35.7187 193.344 34.208C196.235 32.6543 199.537 31.8774 203.249 31.8774C206.918 31.8774 210.198 32.6543 213.09 34.208C215.981 35.7187 218.247 37.8119 219.887 40.4879C221.527 43.1639 222.348 46.2714 222.348 49.8106C222.348 53.2634 221.527 56.3494 219.887 59.0685C218.247 61.7445 215.981 63.8594 213.09 65.4131C210.198 66.9669 206.918 67.7438 203.249 67.7438ZM203.249 59.457C204.932 59.457 206.443 59.0685 207.781 58.2916C209.119 57.5148 210.176 56.4142 210.953 54.9899C211.73 53.5224 212.118 51.796 212.118 49.8106C212.118 47.782 211.73 46.0556 210.953 44.6313C210.176 43.207 209.119 42.1064 207.781 41.3295C206.443 40.5526 204.932 40.1642 203.249 40.1642C201.566 40.1642 200.055 40.5526 198.717 41.3295C197.379 42.1064 196.3 43.207 195.48 44.6313C194.703 46.0556 194.315 47.782 194.315 49.8106C194.315 51.796 194.703 53.5224 195.48 54.9899C196.3 56.4142 197.379 57.5148 198.717 58.2916C200.055 59.0685 201.566 59.457 203.249 59.457ZM245.931 67.7438C242.176 67.7438 238.831 66.9885 235.896 65.4779C232.961 63.9241 230.652 61.7877 228.969 59.0685C227.329 56.3494 226.509 53.2634 226.509 49.8106C226.509 46.3146 227.329 43.2286 228.969 40.5526C230.652 37.8335 232.961 35.7187 235.896 34.208C238.831 32.6543 242.176 31.8774 245.931 31.8774C249.6 31.8774 252.793 32.6543 255.513 34.208C258.232 35.7187 260.239 37.8983 261.533 40.7469L253.7 44.955C252.793 43.3149 251.65 42.1064 250.269 41.3295C248.931 40.5526 247.463 40.1642 245.866 40.1642C244.14 40.1642 242.586 40.5526 241.205 41.3295C239.824 42.1064 238.723 43.207 237.903 44.6313C237.126 46.0556 236.738 47.782 236.738 49.8106C236.738 51.8391 237.126 53.5656 237.903 54.9899C238.723 56.4142 239.824 57.5148 241.205 58.2916C242.586 59.0685 244.14 59.457 245.866 59.457C247.463 59.457 248.931 59.0901 250.269 58.3564C251.65 57.5795 252.793 56.3494 253.7 54.6662L261.533 58.9391C260.239 61.7445 258.232 63.9241 255.513 65.4779C252.793 66.9885 249.6 67.7438 245.931 67.7438ZM275.51 60.1044L275.769 47.8036L292.019 32.3953H304.061L288.459 48.2568L283.215 52.5297L275.51 60.1044ZM267.159 67.2259V19.1882H277.258V67.2259H267.159ZM293.12 67.2259L281.337 52.5945L287.682 44.7608L305.356 67.2259H293.12ZM310.61 67.2259V21.9073H319.285L346.023 54.5367H341.815V21.9073H352.174V67.2259H343.563L316.76 34.5965H320.969V67.2259H310.61ZM378.757 67.7438C375.046 67.7438 371.744 66.9669 368.852 65.4131C366.004 63.8594 363.738 61.7445 362.054 59.0685C360.414 56.3494 359.594 53.2634 359.594 49.8106C359.594 46.3146 360.414 43.2286 362.054 40.5526C363.738 37.8335 366.004 35.7187 368.852 34.208C371.744 32.6543 375.046 31.8774 378.757 31.8774C382.426 31.8774 385.706 32.6543 388.598 34.208C391.49 35.7187 393.756 37.8119 395.396 40.4879C397.036 43.1639 397.856 46.2714 397.856 49.8106C397.856 53.2634 397.036 56.3494 395.396 59.0685C393.756 61.7445 391.49 63.8594 388.598 65.4131C385.706 66.9669 382.426 67.7438 378.757 67.7438ZM378.757 59.457C380.441 59.457 381.951 59.0685 383.289 58.2916C384.627 57.5148 385.685 56.4142 386.462 54.9899C387.239 53.5224 387.627 51.796 387.627 49.8106C387.627 47.782 387.239 46.0556 386.462 44.6313C385.685 43.207 384.627 42.1064 383.289 41.3295C381.951 40.5526 380.441 40.1642 378.757 40.1642C377.074 40.1642 375.564 40.5526 374.226 41.3295C372.888 42.1064 371.809 43.207 370.989 44.6313C370.212 46.0556 369.823 47.782 369.823 49.8106C369.823 51.796 370.212 53.5224 370.989 54.9899C371.809 56.4142 372.888 57.5148 374.226 58.2916C375.564 59.0685 377.074 59.457 378.757 59.457ZM418.85 67.7438C414.75 67.7438 411.556 66.708 409.268 64.6363C406.981 62.5214 405.837 59.3922 405.837 55.2488V24.6911H415.936V55.1193C415.936 56.5868 416.325 57.7306 417.102 58.5506C417.879 59.3275 418.936 59.7159 420.274 59.7159C421.871 59.7159 423.231 59.2843 424.353 58.4211L427.072 65.5426C426.036 66.2764 424.784 66.8374 423.317 67.2259C421.893 67.5712 420.404 67.7438 418.85 67.7438ZM400.463 40.9411V33.1722H424.612V40.9411H400.463ZM448.952 67.7438C444.981 67.7438 441.485 66.9669 438.464 65.4131C435.486 63.8594 433.177 61.7445 431.537 59.0685C429.897 56.3494 429.077 53.2634 429.077 49.8106C429.077 46.3146 429.875 43.2286 431.472 40.5526C433.112 37.8335 435.335 35.7187 438.141 34.208C440.946 32.6543 444.118 31.8774 447.657 31.8774C451.067 31.8774 454.132 32.6111 456.851 34.0786C459.613 35.5029 461.793 37.5746 463.389 40.2937C464.986 42.9696 465.785 46.1851 465.785 49.9401C465.785 50.3285 465.763 50.7817 465.72 51.2996C465.677 51.7744 465.634 52.2276 465.591 52.6592H437.299V46.7678H460.282L456.397 48.5158C456.397 46.703 456.031 45.1277 455.297 43.7897C454.563 42.4517 453.549 41.4159 452.254 40.6821C450.959 39.9052 449.449 39.5168 447.722 39.5168C445.996 39.5168 444.464 39.9052 443.126 40.6821C441.831 41.4159 440.816 42.4733 440.083 43.8544C439.349 45.1924 438.982 46.7894 438.982 48.6453V50.199C438.982 52.0981 439.392 53.7814 440.212 55.2488C441.075 56.6731 442.262 57.7737 443.773 58.5506C445.327 59.2843 447.14 59.6512 449.211 59.6512C451.067 59.6512 452.686 59.3707 454.067 58.8096C455.491 58.2485 456.786 57.4069 457.951 56.2847L463.325 62.1114C461.728 63.9241 459.721 65.3268 457.304 66.3195C454.887 67.2691 452.103 67.7438 448.952 67.7438Z"
          fill="#2B3D69"
        />
        <path
          d="M86.2096 50.3913L71.0426 41.6346C70.0478 41.0603 69.7097 41.2555 69.7097 42.4042V47.0617C69.7097 48.3465 70.3951 49.5336 71.5077 50.1759L82.6274 56.5959C83.2532 56.9572 83.6418 57.6305 83.6419 58.3533V68.7914L65.8319 58.5088L65.8318 40.6944L65.8317 15.9917C65.8317 12.7173 64.0703 9.66666 61.235 8.02988L49.6276 1.32835C46.7922 -0.308372 43.2693 -0.3088 40.434 1.32835L28.8264 8.02988C25.9819 9.67216 24.2296 12.7072 24.2296 15.9918V32.6096C24.2296 33.7583 24.5677 33.9535 25.5625 33.3791L29.5961 31.0503C30.7086 30.408 31.394 29.2209 31.394 27.9361V15.9917C31.394 15.2691 31.7828 14.5959 32.4088 14.2345L41.4485 9.01536L41.4486 28.685L26.0208 37.5921L5.4032 49.4959C2.5675 51.1331 0.806213 54.1839 0.806396 57.4577V70.8608C0.80658 74.1346 2.56769 77.1858 5.4032 78.8227L17.0106 85.5243C19.8552 87.1667 23.3597 87.1667 26.2043 85.5244L39.8201 77.6632C40.8149 77.0889 40.8149 76.6985 39.8201 76.1242L35.7866 73.7954C34.674 73.1531 33.3032 73.1531 32.1906 73.7954L22.622 79.3198C21.9962 79.6811 21.2188 79.6811 20.5928 79.3197L11.553 74.1005L27.812 64.7134L43.2397 73.6206L65.4086 86.4198C68.2443 88.057 71.767 88.0569 74.6021 86.4198L86.2095 79.7183C89.0446 78.0812 90.8065 75.0304 90.8063 71.7564L90.8064 58.3532C90.8064 55.0687 89.0541 52.0336 86.2096 50.3913ZM71.0195 80.2154C70.3941 80.5765 69.6166 80.5766 68.9908 80.2152L46.8219 67.416L31.3942 58.5088V48.7795C31.3942 47.6309 31.0561 47.4357 30.0613 48.01L26.0278 50.3388C24.9152 50.9812 24.2298 52.1683 24.2298 53.453V58.5088L7.97083 67.8959L7.97095 57.4574C7.97095 56.7352 8.35962 56.0618 8.98541 55.7005L31.1543 42.9013L45.0308 34.8896L53.4567 39.7542C54.4514 40.3285 54.7896 40.1333 54.7896 38.9847V34.3271C54.7896 33.0423 54.1041 31.8552 52.9915 31.2129L48.613 28.6849L48.613 9.01536L57.653 14.2347C58.2784 14.5958 58.6673 15.2691 58.6673 15.9917V41.5902L58.6675 58.5089L50.2417 63.3735C49.2469 63.9479 49.2469 64.3382 50.2417 64.9126L54.2753 67.2414C55.3879 67.8837 56.7586 67.8837 57.8712 67.2413L62.2497 64.7134L80.0598 74.9961L71.0195 80.2154Z"
          fill="url(#paint0_linear_1_47)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1_47"
            x1="76.5099"
            y1="11.1618"
            x2="28.624"
            y2="93.632"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="#00EBE7" />
            <stop offset="1" stop-color="#6923BA" />
          </linearGradient>
        </defs>
      </svg>
    );

    const bannerWithTitle = (title: string) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}>
        {bannerSVG}
        <div
          style={{
            fontFamily: "Gilroy",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            marginTop: 30,
            padding: "0 120px",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
          }}>
          {title}
        </div>
      </div>
    );

    const banner = (
      <div
        style={{
          display: "flex",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}>
        {bannerSVG}
      </div>
    );

    return new ImageResponse(title ? bannerWithTitle(title) : banner, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Gilroy",
          data: fontData,
          style: "normal",
        },
      ],
    });
  } catch (e) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
