import * as React from "react"

const SvgComponent = (props) => (
  <svg
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    viewBox="0 0 6.827 6.827"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      height={6.827}
      rx={1.456}
      ry={1.456}
      width={6.827}
      style={{
        fill: "#00bcd4",
      }}
    />
    <path
      d="M4.9 1.592c-.584-.019-.98.31-1.186.984a.814.814 0 0 1 .311-.066c.213 0 .308.12.282.36-.012.145-.106.356-.282.634-.176.277-.308.416-.395.416-.114 0-.217-.215-.312-.643a15.332 15.332 0 0 1-.169-.966c-.076-.479-.277-.703-.603-.671-.139.012-.345.139-.622.378-.201.183-.405.366-.613.549l.198.255c.189-.132.3-.198.33-.198.144 0 .28.227.405.68l.34 1.25c.168.454.376.681.62.681.397 0 .88-.372 1.452-1.116.553-.713.838-1.275.857-1.685.026-.548-.178-.83-.612-.842z"
      style={{
        fill: "#fff",
      }}
    />
  </svg>
)

export default SvgComponent
