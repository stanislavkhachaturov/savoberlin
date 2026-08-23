// Сгенерировано автоматически: pnpm assets / обновление манифеста. Не редактировать вручную.
// vorher*/nachher* — фото заказчика; остальное — Unsplash.

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export const images = {
  "hero": {
    "src": "/images/hero.webp",
    "width": 2200,
    "height": 1238,
    "blurDataURL": "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAACQAwCdASoYAA4ALrV2u12jqampiYC0SgCsIHAGBRgDt9kg70/wAP7H87kMcovAlNnKRghb7Q8xyrU9/VgIT5Slg2+90gAA"
  },
  "roofs": {
    "src": "/images/roofs.webp",
    "width": 2000,
    "height": 875,
    "blurDataURL": "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADQAwCdASoYAAoAPu1yrU+pp6QiMAgBMB2JZQCdMvIDTefBONLz2QAA/t6AUuMsGoHko0BsdAPGrXKn1eSTSQS2+7ONp5eZYgAAAA=="
  },
  "service-entruempelung": {
    "src": "/images/service-entruempelung.webp",
    "width": 1400,
    "height": 1050,
    "blurDataURL": "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAAAwBQCdASoYABIAPu1kqk4ppaQiMAgBMB2JZQC/7B4hTh2k/F6mCGIUTV89gI6v+yRIAAD6M6peZzEayBoEwtpxXY5U5HHo8ODvIVYhbB6+wRiZizeXVU9MnxdUJAw3UqBOsuJpOJ6kaEkAAAA="
  },
  "service-umzug": {
    "src": "/images/service-umzug.webp",
    "width": 1400,
    "height": 1050,
    "blurDataURL": "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAAAwBQCdASoYABIAPt1YpE2opSOiN/qoARAbiUAToAM+bWlsf1Vg0vZsq+aV9QUCLONSXAD+79eUOIq8CkspAwchQucKnx06FqyoxXd6oOhRZem7gKpTFvlCSSS+hqyY9l7PyCoZIfoyKj/7NZAAAA=="
  },
  "service-rueckbau": {
    "src": "/images/service-rueckbau.webp",
    "width": 1400,
    "height": 1050,
    "blurDataURL": "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADQBACdASoYABIAPuFcqU2opSQiMAwBEBwJZwDGfCPtb2FCJqxm2p4deKQ7wyfdOAD6ZuDRqdwc3GC++o1WGBNxgFeRjhdH+8OignTv2WaSM+ACZXE004HOwAA="
  },
  "vorher": {
    "src": "/images/vorher.webp",
    "width": 1207,
    "height": 1644,
    "blurDataURL": "data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAACQBQCdASoYACEAPuVipU2pJiOiNVgIASAciWUAy6QUNKPIUB43ViFZJz8Fzou3GQ4C4eubYAD+7t6+23gJXpc5m/EPnbvGPFoDObXG6sq6544IcY5CG422xvmFD3KEbonyNUUTh5qHlwyAHvzrTtGZFvvfZmK48jxSQ2ixHCCT2y/3vd1TDCQy6s0QcAAA"
  },
  "nachher": {
    "src": "/images/nachher.webp",
    "width": 1207,
    "height": 1644,
    "blurDataURL": "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAABQBQCdASoYACEAPt1cok2opSMiNUgBEBuJZwC+SCzVRnfM2bElAoyE3Z7b6uW/XzxH/KAA/tk5h6tXwf1J8U1CiCuPdVMKQZx61c9L+di20nYJs7uxFp1VD4DoBRWBIBio119AWzq0c3fXgxoAAA=="
  },
  "vorher2": {
    "src": "/images/vorher2.webp",
    "width": 1092,
    "height": 1440,
    "blurDataURL": "data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAABwBQCdASoYACAAPu1qrU8ppiQiMBgIATAdiWUAv+wOnmHI5s+RSnLayb0PDv9eWQogiOggAP7F3faBa5LcnuJ434H72FWtHerws+1SagG3xUAtMkX+bwXwxfvuMD3uvxFsJyrl2bV9VKxpMHVqlpSlC53giXrkIVPMHAG1G0rZbi6gwZbNgYCXUG4Zb4AA"
  },
  "nachher2": {
    "src": "/images/nachher2.webp",
    "width": 1077,
    "height": 1460,
    "blurDataURL": "data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAABQBgCdASoYACEAPuFgpk2opiOiNVv4ARAcCWcAzjgg6uQGYQZ4myC1/ibfWin4c7J3cSDAUKri2rfFAAD+ZIpP+i/fmlr3292US4W6Krd+isGPo7cyivmglNtQQ/KhrsaZJxPzP7DBy7+wMjsBN+jF7lFVRySxgpNYJl2HTc6iwfohKMWHkHIA"
  }
} satisfies Record<string, SiteImage>;

export type ImageName = keyof typeof images;
