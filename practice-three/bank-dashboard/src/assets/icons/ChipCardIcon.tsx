import { CustomClassType } from '@app/types';

interface ChipCardIconProps extends CustomClassType {
  isDefault?: boolean;
}

export const ChipCardIcon = ({ customClass, isDefault }: ChipCardIconProps) => {
  return (
    <svg
      aria-label="Chip Card Icon"
      className={customClass}
      width={35}
      height={35}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect
        width="34.7713"
        height="34.7713"
        fill={isDefault ? 'url(#pattern0_78_444)' : 'url(#pattern0_105_314)'}
      />
      <defs>
        <pattern
          id={isDefault ? 'pattern0_78_444' : 'pattern0_105_314'}
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref={isDefault ? '#image0_78_444' : '#image0_105_314'}
            transform="scale(0.01)"
          />
        </pattern>
        <image
          id={isDefault ? 'image0_78_444' : 'image0_105_314'}
          width="100"
          height="100"
          xlinkHref={
            isDefault
              ? 'data:image/png;base64,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'
              : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAADBJJREFUeF7tXXmQHFUZ/309kzW7y5WyFCVEwhEiEoTsbr/Z7E4vFRQNcqilhhTR0oLSlIVaUEUgXBYCKpd4lBcUpSUmEGIVQqGBEMxWtmc3O92T3YARhQhZJJCIVUQIycLuTH/mTWaanskePUe/npJ+VfvPzvuO9/v1O/q9199HiEpDIUAN5U3kDCJCGuwhiAiJCGkwBBrMnaiHRIQ0GAIN5k7UQ/5fCFm3bl1s7uy5bZzjxUTUDuBUMOaA0AKgucHaGZQ7o2AcAOFlMJ5j8BA0bHrp1ZeGly5dmqvGaMU9JNOfOTnHuRXEtBzAcdUYfQ/IvEKgNQy+RxjixUra65uQLb1b5sZisVtBWAYgVomR93DdLAhr4xS/oa277SU/OExLSH5o+vDclQBuBPLDUVQqR+AAg28WSXEnETlTiU9JyODg4LFaVnsAjHMq9yGSmACBp8a18eXd3d2vTYbOpISkN6dPBOFJIjolgrauCOxk8JKEkXh+Iq0TErJ1YOspuVzOBPChuroSKSsisCcWixntXe3/LIfkMELyw9S4tgXAiRF+gSLw4rg2vqh8+CohhJk1O2U/AeDcQF2JlOcRIFDvzt07z/W+s5QQYpnWKgA/jPBShwAzX5PoSdxRtOgSkjEzH3HgPAugVZ07kSUAB3LZ3OmLFi8aOdRrCsXqs1aDIN++o6IYAQLdrxv6V11C5HaI4zj/ABCv1BdmXs85XtG5uHPXVLJPb3i6dax17Hgw2hj8OQDyr6lSe4rqjwF4hECPgDDUtL9p12jT6Cwtrt0L4LwAfMgCmC+3WfI9JJ1K30FM8m284uJknTnTkTGR0sJDcCeAz1dsNFiBhwGsnGgPytpszYGGfwVk/nZhiFVU2BqRRqraKKyWkGKj0n3pq4lILiS0gBrqV61DTKv0Hl0+JBOWgAnZpSf1E8jqt3Q4sPx6PUG9x+FghThbvFytjgIpt1crXw85YrraBxlyyFpSD3sT6XDgdJBCMPYzeLtG2urmY5rvXbBggRyn3WKb9h8Lc0tQ7Z1K78PCEF/wVtixfsf7Xj/i9W/IhQ6BFqhYfcqHgqw+ay0IFytGYVs2lr2gq6vrlaLdwnaNXHbPUOyLfDBO884ZAwMDs+O5+J8BnKnYl7Vkmda2EAzLBfdwyzEtnd6ekjbTfyDQFxWDsE4Ywn0gZc/Ye+TedFiYSELkVvAHFIOQN0egb+mG/ouibStlLQdjtUpfCHSJbugPuj6Y1ncA/FSlDx5br0lCDoR4Bj4oDLGo6JCdsuczs3wfUlYYPN+7FW6ZluwdQpkDpYZGJSEcknFpdp8wxFFF+6lU6sgmbnpTpT9jNHZUMpncV7SZNtP7CHSESh+8tsIm5E1hiKOLDsm3+Xda3nlLJRjZWLalq6trNCJEIsDYInpEVxGMwtv7YYc2QRLEDp+UODux00PIIIESQdqcSnfYPeRyYYhfunNIn72Mid0JVgkohItFUqxzCelLf5uIfqbE9gRGwiRkqGVWy6LQl72Mh0SPkFeb8qWw7B08uLl4VhikhEXIUJziF7Yl214tNtoyrZMA/D2EHeCxXDY3v3geIf3Jvxg68cfAWKiaFGWEMPgtYvorCKtbZrXc5+0ZzEy2acut7otUA5CfyogfTSQT8jjALdu3b28a3Tv6dWZezsRnqFp5TXtRTgVAjXB0XH6UqqLdE9kIlRDZMzJm5lom/n5YAHjsMgjX6936bUQU2rtZaIRkBjIfdXLOj4Pczq6S5MeJ6Eo9qT9XpXxNYqERYpnWeDVHxjW11r9wVhhC9a5z3jtlk7owRPmVo9CGBT+8hOVvRMgk7ESE+HlsFdaJCFEIth9TESF+UFJYJyJEIdh+TEWE+EFJYZ2IEIVg+zEVEeIHJYV1IkIUgu3HVESIH5QU1okIUQi2H1MRIX5QUlgnIkQh2H5MRYT4QUlhnYgQhWD7MRUR4gclhXUiQhSC7cdURIgflBTWiQhRCLYfU6ER4se5IOpYpvU3AB8LQncddD4rDHF6HfRUrCK0Wyf524op+xMArgLw6Yo9D0ZgA4C79KT+l7DuZoVGiBfPtJn+EjH9CoT3B4PztFr/C+AaYQj52XOopSEIkQgMpYaOy3JWfvmq+tb5tjjFz/de/A6TEWXXgAC8DeAVBg8cnDvWiaRYXx4Qcrh3+Jjx2Ph6ENzvDgMGZ2BGdsb5CxcvlD3ELYW4YeeDsBQM+UGRjHIxM2Bf8upVElLSHgI9k0Pu0k6jc6v3h+292484ED8gSTsjSACk/eZsc/eCxQtKPqEbNAfbNWi/Ddr+ZG0LjZCCQ2PEdEN5SIvBzYPzNE2zAbjfH9aZnDdisVhHeczDtJm+hkC3hBC8wG1e2IQccoRxi+gR3/WCbqWsi8FYW2ciDqkr+4xN/ss27VsZfH0g9ipQ2hiESIwO3Tj/idd327Q3MXhxBe2Zviphk0gKudx2i91nX8nEd08vHHyNhiEEwBiDRcJIPF1sdtpMn0kgOcfUK7R5zmGnrbOn85miDavfOgsOZLCAhgim1kiESIy2jewe6fBG6bRM6zEAF9Tp2XxMGML9bK63tzfeGm/NhBLXZJIGSULkR/NKlnS+QCUsE0nxULGunbIvYuZHfclOU4nBFyaMxJ/cHphKX0JMa+qhu0468qE1Qgs+M0kjhoQhZD6SfCk8xTI4Wq1RtneP7B6ZU9L7UtZQGF/aTkHevyUhwyG8HU/5QJFDbfrZuvQrXyzTksEE3G/Jq3waHxCGcKOuZvoybQ45Je9AVeqtnxhhOKwAZlM2gsGrEkbCDflnm/blDP55LS1n4m8mkolfu0Nhn31dg3xs6jbrYGSiB1WG+KsEz43CEJ8qCmTMTMKBI6MrVF2IKaH36G5sScu0ngJQsvytWnm9BAkr6xEEs17uePXsEIY4tfiPfHafeMwNEFONwYPbISd0GB1uiFfLtGSQm5Or0RWUjMZaezFMrEzHMzsoQ1XoLYmjVY+wTVqz1trR0SGDteVL2HGxJsDkUJhY+YNt2rcz+OoqgAtKpISQ3t7ema3xVjemVTVGZ+2bNXPeZ+a908CE3CYMcW2ekELgF/mhfMWhxqsBx4fM88IQ84v1CjlN9viQm7TKuDZ+rDdXR7ovvaOBsgdl2eFTZdyud4Pxp6zfg/HlWhpdL1lielLv0d1j3YAm9Y0APlkvn2vSw/id6BFfkzpcQob6h07IOlkZNzf0TGzly950Kn0ZMd1XS6MJdJlu6L8p6rBS1rVg/KAWnXWS3Q8HpxUjg5cc4SqMcj11WzQsFN1CxhMuTsD3E+grtQDgTQmRnzc32wtZ46FadNZFlrBSJMVdRV0TpTySNy/C7MolWyeFZAEyAvaxNQKwR0/qs73Hxlb4Wycb9aS+xOvTYZcc+vv7PzjDmSGPUMNZox++uXiezFFSIxlF8fOEIWSOrXyxw4jx+G5DXohzfFFbT9t/vG1rrLR5hOGRV0d07wZgOpV+hJg+Ww9CZIIW3dDdfCWFjUt5VKz6psseTdOSHd0dL5S3a8rEkqSRHL7m1QMMHzrGHHZ07+FRZnPmDEdz5FxSr9wiDA1t3vlpsG/w4xrlz+9VHVBVnliyCF5h+JLnBSrmlCuEIUpirtt99gYmdve0fJDqp8oTwhAlaYvslH0FM8tgakGXjXGOLy8fpqYdsrwV5B0ly7SuOjjxyEsIgWRwY/D3EkbiJq/dIAPzM/HyRDLxQIm9PutmUD4BcxBl/8EXjJv0bv3umpITez2TafUYfAuDL6njG73M3XGdMMSPvLZkLhEn51gMnhUEOgTaSxrp5WO4lbKuAkPGf6zX8JUFYw0YN/rNQFTxVVK5zUKgFQVijq8BsG3k0KXegyipK7Mxc7Qz05F5eAO/KEdvU0/HuR1vlDx4hw6u5AtkLclcZMa6NezwPd4w5n6wqpiQolI5lKVT6YUxjp3DxG0gzAfnd4yPnCT9hdwc3AXGgEz6rif1DeU3zPPZEZymDSqvko7R2BJvdgTZvny01P7MEjCWOex0EZFsV/MEgMo2ycwKkoDnQdiqOdqmdqN923RD02TkVE2IH7ajOpUjEBFSOWaBSkSEBApv5cojQirHLFCJiJBA4a1ceURI5ZgFKhEREii8lSuPCKkcs0Al/gen51Uj8nUPOQAAAABJRU5ErkJggg=='
          }
        />
      </defs>
    </svg>
  );
};
