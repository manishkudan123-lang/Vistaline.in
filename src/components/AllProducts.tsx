import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, MessageCircle, X, ZoomIn, ZoomOut, Maximize, ChevronDown, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useProductImageLookup } from './useProductImageLookup';

function ImageWithSkeleton({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [error, setError] = useState(false);
  return (
    <>
      {!error && src && (
        <img
          src={src || undefined}
          alt={alt}
          loading="eager"
          referrerPolicy="no-referrer"
          onError={() => setError(true)}
          className={(className || "") + " relative z-10 w-full h-full object-contain"}
        />
      )}
      {(error || !src) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-100 z-20 rounded-[inherit]">
          <svg className="w-10 h-10 mb-1.5 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[10px] font-bold">Details View Only</span>
        </div>
      )}
    </>
  );
}

interface Product {
  id: string;
  code: string;
  name: string;
  category: 'Profiles' | 'Door Sections' | 'Accessories' | 'Hardware';
  image: string;
  desc: string;
  material?: string;
  finish?: string;
  size?: string;
}

const photoMappings: Record<string, string> = {
  "photo_001": "1JQqSwgbzXvm76yomzwhOBduXcbq-J-HF",
  "photo_002": "1hMHyTWnuFJVNVJUoRp-PIWR7rvCkJ6pS",
  "photo_003": "1tl7f3AJnKbnHd5uEmM3SWBMLgibANciG",
  "photo_004": "1un39Ms6zYql3jRHFr_slF42lqtfmLvbb",
  "photo_005": "1YELdYNdqaH2PZKVNEGZJRY6BDxrTCuTe",
  "photo_006": "14JLwa247kZXvlHMTsbv5gSFf7DdxsNCU",
  "photo_007": "1U4Ff6lAl07NPpoigxtCaLMAyjp4NgEHL",
  "photo_009": "1iH03G81xrvNluPRfq3oCD2awQBTKNjhA",
  "photo_010": "1x4zNthn8JFdMUluv7cEbFeJW9DG-9lck",
  "photo_011": "1X1GLMD7H2PEqzbJv0IJA5fHUTuneJEIe",
  "photo_012": "1QUhfItfhJ2OwalnYMgO4BHiK5uvzoNgS",
  "photo_013": "1fhxOt7S5h5O5meoTqdbQrweeWwVnDhUT",
  "photo_014": "1d_ciMPG7KNcX6eliW1w6_cFfRB64BDAs",
  "photo_015": "1ayM0EPHfyo6mZZv8y7w1kLxR37H1iJk8",
  "photo_016": "1BAfoBgmwjTJWXDu7AdxyzNwkcDryD_AH",
  "photo_017": "1MFiRaqZxQW1jm4Qga-d5Y7UEtAeUtUNd",
  "photo_018": "1Zp_P2NI_DOv2ylCWOEnahoMYTc9FMngL",
  "photo_019": "150YTtf4JFxGkRzaY74KwtWWXtZI4IhY4",
  "photo_020": "1JSIrJaWsTzw7UK17YghueoNCa6OBkuCy",
  "photo_021": "16T-DTkNFm_iqJskF-_HfbJLL6Z23FQHh",
  "photo_022": "1jEtTk30V23rcoGj3eqKN-dWJrm0Z90vH",
  "photo_023": "1lJCUkjn9TWd5YCl2z-F88hbMmPPdCoXk",
  "photo_024": "1YUQffhQ1BMDknANHttmb7cu9OEPGM-pw",
  "photo_025": "1PDI74516J-gWRhKHKSPryNyANQW-s1Ts",
  "photo_026": "1sb1uSL-7eX_7ivyekVdnR-HmOKUHY_Wn",
  "photo_027": "1ZTB1dgqAkqdGbhjocRnkfAUI6K5kPlTA",
  "photo_028": "17w-XTwZkGNTeKEGHu0RlS6FqnHed-WhP",
  "photo_029": "13WebGYgXw2TDs_nDrsdNNLn6HIog8DeT",
  "photo_030": "1IWZAsee6q0g51dDOzY7qGj2A9XH2WucM",
  "photo_031": "1QH3oRV9MQzwKghk4lAaRyFFCYPJT1SrN",
  "photo_032": "1TVNk79cmuKtgYfAaDqJ36KbxYlN0GEw9",
  "photo_033": "1lrkrKKq78fdzjjUD-1o-6oBzejvaZmSA",
  "photo_034": "1JGJwOz8gbld0z8mVzBZ_u5ggtMqzKP_P",
  "photo_035": "1elfaesD2yr23rAiJBu-ScvxeeagizGEl",
  "photo_036": "188WZS2EXcszhS5EjcS6xEkc-rEnAFaAI",
  "photo_037": "1WI-x7kskDCqRzOKmKzkbE75qSQv0hcBs",
  "photo_038": "1i4HD5rKaE_OEii8ea6IxwQIr-bqwgDrQ",
  "photo_039": "11UPHQsTsTZkfee-gWGBovok5cG4cE8_B",
  "photo_040": "1vqL3aBCTTmy7WMdPphxm8FQsEAyHghc5",
  "photo_041": "19-QYTDmDeSm6MUCgXjk3zPPXJiQHxvSj",
  "photo_042": "1-3SnQquxSoMZJnATZZdT5giqOKcOX6aA",
  "photo_043": "1QwSG3UsMFzEiGV7F8zGUYd8D-826ISJB",
  "photo_044": "1eIzXSY_gD9jsFggUEE55u2ad_eI0UTCn",
  "photo_045": "13rYwnEkurSZ_BmK_V2lZZ3qDbx2cb100",
  "photo_046": "18buN0zge6Rf81oGokfJ9F3TouQczTBF6",
  "photo_047": "1-8p2rPU_8bJ9fisvRnVHWG0aNgcRFayt",
  "photo_048": "1nCcHdKdLulS3wudc-6gLQ4avGkpKF7tl",
  "photo_049": "1L1isV1Oqmfyfn0m0eFplXrbdYyrFoVI9",
  "photo_050": "1CPsSKQQQ9haw8DW9lze8H2mBmXAVbBaw",
  "photo_051": "1VJtvejC40ekcWu95hlRJi3gHUs1l0doq",
  "photo_052": "1Z15wAWFLlHRt58bnYnneOO1BZp0tJ0j6",
  "photo_053": "13UPADCvm316U3l12A5RPNeSerfH85xhs",
  "photo_054": "1nmf7KoSJ6Q49CeU__XwT5RqrEAdmI7Mc",
  "photo_055": "1pB0z1fB-71hBX1A1zlyJN3RnxffvwS3o",
  "photo_056": "1b60qbzsW4x1e170QAoDtbP9p3lR0_c1X",
  "photo_057": "17cjKr3uwEPjO1KCmnJ6txI76LlAKXzV6",
  "photo_058": "1R93pLmrYgnBUJFY9smFusKq8uuAekBb8",
  "photo_059": "1_PJpYkkaoSsuXPBO8CQvnVYBqesKAoTO",
  "photo_060": "1ZPyaYdCGlBBynBR59tQV7R_anemHDlh7",
  "photo_061": "1qj4cY5C72SnctaznTF6goDPcr_NtDHNa",
  "photo_062": "1UU1O4oL7NjLFY0zLkmcW36dEbXsK3teS",
  "photo_063": "1XCtdjhiDjrSL70rbtaac4V6aQrQRv_0s",
  "photo_064": "14slEqZ0CuEHtt-2sP6Pp6L0v_UKv988O",
  "photo_065": "1NwdzXOaVwxgtvYWggW3MwjEespVxDgnM",
  "photo_066": "1RRCzSLsnczRhZNV-UBCX3ho10hWJQ5rh",
  "photo_067": "1GGQmsrDf_9aUSb4NuE3DhcDsd1ubzY3L",
  "photo_068": "11am6XtmLfLLapDv_jz19uWuqH_g4foRJ",
  "photo_069": "1IJ8roMdIucRjhedDMapXV3_W88ScWAKc",
  "photo_070": "1RFGAtVjWbXJJlb96uWxr-sGgpoxuM1nQ",
  "photo_071": "1Qteq3f2_DY8W75Dz-qzQVWQPyGR7hPiU",
  "photo_072": "1bYVwAizOWXQLM9vzVVNIJHo9vup79q4q",
  "photo_073": "1IC58n_BCoch_Nrz4YMg0pHuhrKFr3SMT",
  "photo_074": "1BKw9UaSBut9SRHUDHf5sGL3b1daBT6ky",
  "photo_075": "196TcNFbIAYhPluxxg29EE_mj3yAvtZFT",
  "photo_076": "1FvkMpk0vDLGkO93bGA-1izBtOj851XxK",
  "photo_077": "10HDAQj2vYn0Y_1-GOqxgzWYXySw8dVpb",
  "photo_078": "1e7uEqunUMNM6Rm1sUv_bOeI1u7kuumav",
  "photo_079": "1E-bmgS33B8PJRhxEH3gq_BXI8VGNYay5",
  "photo_080": "1qhFHP__YJjSg7ZKHG2H2P5V7Uu_ay9aO",
  "photo_081": "1PUFsJRpyq2VxKG1rN2GD1SELptm3_eQ0",
  "photo_082": "1V-BNn-MiCfakESGcrmUMYm8ItGfyjdxW",
  "photo_083": "1f1JmuNuxoUEHLOpUxnqmu41GQgt6DrZ4",
  "photo_084": "1sIuy9-MaafeNQzQX9QdeMYDWo2pj-Re0",
  "photo_085": "1ptgZ5mOHhI3VSFfGLzf8rIppn1rr2YQ7",
  "photo_086": "1mAYbn2n07kxFtO-QQqLz4spZxpXv_II_",
  "photo_087": "1VFZpauAFozm1jH02RYebmOxWCrj8KhQz",
  "photo_088": "1orWxeBC73GI1OrrLJcOyo4-bfX_o5Ika",
  "photo_089": "1Fn53VCajXi_3LAJqMytmWtUpm-vBBuVU",
  "photo_090": "1HnSVaJxF4MBlfYxufyhgE2O0UXarruOd",
  "photo_091": "1akSTw4xS54bXOS0_AcjnyBIp22EHeFAV",
  "photo_092": "1WvzQVQv5Nzo4hlkqbxpGk2P5HClK2kuz",
  "photo_093": "1HGYDP51vlTe5Dv4s_kR_IutBJbRoizbD",
  "photo_094": "1nzMbEPAzRc6Rl-MGPzypNrjJ6B2aXmjU",
  "photo_095": "15SbMeXDQ7TsFcfyBH21QIJGWa9kT9GJr",
  "photo_096": "1EBLY4eQMITNvqUL0ANRRrElurzOm-1pP",
  "photo_097": "1TSZaMEA30pIesdQHMvhVxwLC6o3FYKqz",
  "photo_098": "1HB5H7f1TpScamaCtt9hWH6imyPZKTD0C",
  "photo_099": "1X19LxgOMTi_pzR8xOSj2MXFwz-81FLg5",
  "photo_100": "1N5aUZpGz9fXWun_wsBWWkBRbi44zC2AN",
  "photo_101": "1OaCzm6zZacUEVsugBaU9CdFZaIwfTpdz",
  "photo_102": "1NBnWitmvqwNUgzYRnJyK0MQVdUp3Fq1u",
  "photo_103": "1RYG9f8ZUPC8A0l1I1DDPSiFdYZ7rrjtJ",
  "photo_104": "1G_tDsG1GLgAbkn2PLrfzYw_haF68cRpf",
  "photo_105": "1t18H3mOG-QLCmeNZDbg_M6Bk6IXraZ1i",
  "photo_106": "14L1kyrwfk_B8cjUTwy5InfGwp26hrV0t",
  "photo_107": "1j_5TqLf7oz3xAXV2AAyRUanbhNSOah6j",
  "photo_108": "14ypxrm_aeNQ1ILK_J7eMiVBt_XS1VIn9",
  "photo_109": "1YHxv6fJt4CbRj6hCyk2UrxTMg1h4AEYe",
  "photo_110": "1FEfr-UKBvh_zqXNXHxLeCFSG8cLDWNRF",
  "photo_111": "18dRq8_pnd-ZVMmP0njsi0DX-mcr69iGr",
  "photo_112": "1o7djgxzDaB_YNJnCtDvxCpqmIjSL-S_-",
  "photo_113": "14J7G6k7awCkupoFBzBNvzzDNsh7VFuX-",
  "photo_114": "1U9Aw_S9PtiHqayoUJmGZbRtqRcC_QkZ0",
  "photo_115": "1NdN5bVS2B88W3RZoM2kUBpnmLWJUIE86",
  "photo_116": "1oDijKijrhEscOLbp6SY_qvnEc8BmYa8j",
  "photo_117": "1de1EjNYhoPjlCGA44axe3R7cpOoN7cTP",
  "photo_118": "1fjzVj3DNbTDKccuKFrKgVvDCXevaUF5u",
  "photo_119": "1L8yMPxCk8_dDfVc0wLBXe6GUjdK14Boc",
  "photo_120": "1h3NeCwQBZNELktjFnjYILta262L7l4m3",
  "photo_140": "1gc_MYzkZ5myYKoRe-vS2k5DdNFXJ9482",
  "photo_141": "1eegOZAka_cog02KzVfbYcgN-uyAD7Vbs",
  "photo_142": "1ZNzwmk55C_iJrQgKqYSK-3Tne9QY5MFV",
  "photo_143": "13_iiQ75RtepaqHQdZy-3b789fjecb9xu",
  "photo_144": "1Iqb2TIHgnk6s44SwCzbRIyv8J-7VHqeN",
  "photo_145": "14ypxrm_aeNQ1ILK_J7eMiVBt_XS1VIn9",
  "photo_146": "1CoWg9fuaS2w3gNPsE0hNL1gTXB-HauZU",
  "photo_147": "1Yse7M3tXC7ksWhckK-xeTUgwtNzsuw16",
  "photo_148": "1j_5TqLf7oz3xAXV2AAyRUanbhNSOah6j",
  "photo_149": "1FEfr-UKBvh_zqXNXHxLeCFSG8cLDWNRF",
  "photo_150": "18dRq8_pnd-ZVMmP0njsi0DX-mcr69iGr",
  "photo_151": "1dwfYlG-2-ADCgzclWrNt93nqoq_Xg_uv",
  "photo_152": "14J7G6k7awCkupoFBzBNvzzDNsh7VFuX-",
  "photo_153": "1U9Aw_S9PtiHqayoUJmGZbRtqRcC_QkZ0",
  "photo_154": "1oDijKijrhEscOLbp6SY_qvnEc8BmYa8j",
  "photo_155": "1QHMGZAAwNGHattkv8MmylCuSRF1zhjwh",
  "photo_156": "1M9AevzlUBTfBhb-DBrFJUdxnc5sXKUZd",
};

const getImageUrl = (photoKey: string) => {
  const fileId = photoMappings[photoKey];
  return fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600` : '';
};

const productsData: Product[] = [
  {
    id: "blr-01",
    code: "BLR-01",
    name: "Aluminum Skirting 50mm",
    category: "Profiles",
    image: getImageUrl("photo_001"),
    desc: "Architectural Grade Aluminum Skirting 50mm engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "50mm"
  },
  {
    id: "blr-02",
    code: "BLR-02",
    name: "Aluminum Skirting 100mm",
    category: "Profiles",
    image: getImageUrl("photo_002"),
    desc: "Architectural Grade Aluminum Skirting 100mm engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "100mm"
  },
  {
    id: "blr-03",
    code: "BLR-03",
    name: "Wideline 78x25 door frame with rebate",
    category: "Door Sections",
    image: getImageUrl("photo_003"),
    desc: "Commercial strength Wideline 78x25 door frame with rebate profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "78x25"
  },
  {
    id: "blr-04",
    code: "BLR-04",
    name: "Transition Profile 30mm",
    category: "Profiles",
    image: getImageUrl("photo_004"),
    desc: "Architectural Grade Transition Profile 30mm engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "30mm"
  },
  {
    id: "blr-05",
    code: "BLR-05",
    name: "Transition Z Pro 45mm",
    category: "Profiles",
    image: getImageUrl("photo_005"),
    desc: "Architectural Grade Transition Z Pro 45mm engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "45mm"
  },
  {
    id: "blr-06",
    code: "BLR-06",
    name: "Corner Guard 12x12",
    category: "Accessories",
    image: getImageUrl("photo_006"),
    desc: "High performance acoustic-grade Corner Guard 12x12 specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "12x12"
  },
  {
    id: "blr-07",
    code: "BLR-07",
    name: "Corner Guard 15x15",
    category: "Accessories",
    image: getImageUrl("photo_007"),
    desc: "High performance acoustic-grade Corner Guard 15x15 specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "15x15"
  },
  {
    id: "blr-08",
    code: "BLR-08",
    name: "Corner Guard 19x19",
    category: "Accessories",
    image: getImageUrl("photo_009"),
    desc: "High performance acoustic-grade Corner Guard 19x19 specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "19x19"
  },
  {
    id: "blr-09",
    code: "BLR-09",
    name: "Corner Guard 25x25",
    category: "Accessories",
    image: getImageUrl("photo_010"),
    desc: "High performance acoustic-grade Corner Guard 25x25 specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "25x25"
  },
  {
    id: "blr-10",
    code: "BLR-10",
    name: "Sticon Profile Infill 25x12",
    category: "Accessories",
    image: getImageUrl("photo_011"),
    desc: "High performance acoustic-grade Sticon Profile Infill 25x12 specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "EPDM / Silicone Rubber",
    finish: "Matte Charcoal Black / Opal Frost",
    size: "25x12"
  },
  {
    id: "blr-11",
    code: "BLR-11",
    name: "Sticon Profile Infill 25x17",
    category: "Accessories",
    image: getImageUrl("photo_012"),
    desc: "High performance acoustic-grade Sticon Profile Infill 25x17 specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "EPDM / Silicone Rubber",
    finish: "Matte Charcoal Black / Opal Frost",
    size: "25x17"
  },
  {
    id: "blr-12",
    code: "BLR-12",
    name: "Hat Section 5mm",
    category: "Profiles",
    image: getImageUrl("photo_013"),
    desc: "Architectural Grade Hat Section 5mm engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "5mm"
  },
  {
    id: "blr-13",
    code: "BLR-13",
    name: "Hat Section 7.5mm",
    category: "Profiles",
    image: getImageUrl("photo_014"),
    desc: "Architectural Grade Hat Section 7.5mm engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "5mm"
  },
  {
    id: "blr-14",
    code: "BLR-14",
    name: "Hat Section 10 mm",
    category: "Profiles",
    image: getImageUrl("photo_015"),
    desc: "Architectural Grade Hat Section 10 mm engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "2800"
  },
  {
    id: "blr-15",
    code: "BLR-15",
    name: "12x6mm T profile",
    category: "Accessories",
    image: getImageUrl("photo_016"),
    desc: "High performance acoustic-grade 12x6mm T profile specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "12x6mm"
  },
  {
    id: "blr-16",
    code: "BLR-16",
    name: "10mm T joint profile",
    category: "Accessories",
    image: getImageUrl("photo_017"),
    desc: "High performance acoustic-grade 10mm T joint profile specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "10mm"
  },
  {
    id: "blr-17",
    code: "BLR-17",
    name: "12mm T joint profile",
    category: "Accessories",
    image: getImageUrl("photo_018"),
    desc: "High performance acoustic-grade 12mm T joint profile specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "12mm"
  },
  {
    id: "blr-18",
    code: "BLR-18",
    name: "8mm eye joint profile",
    category: "Accessories",
    image: getImageUrl("photo_019"),
    desc: "High performance acoustic-grade 8mm eye joint profile specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "8mm"
  },
  {
    id: "blr-19",
    code: "BLR-19",
    name: "10mm eye joint profile",
    category: "Accessories",
    image: getImageUrl("photo_020"),
    desc: "High performance acoustic-grade 10mm eye joint profile specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "10mm"
  },
  {
    id: "blr-20",
    code: "BLR-20",
    name: "12mm eye joint profile",
    category: "Accessories",
    image: getImageUrl("photo_021"),
    desc: "High performance acoustic-grade 12mm eye joint profile specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "12mm"
  },
  {
    id: "blr-21",
    code: "BLR-21",
    name: "10mm L joint profile",
    category: "Accessories",
    image: getImageUrl("photo_022"),
    desc: "High performance acoustic-grade 10mm L joint profile specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "10mm"
  },
  {
    id: "blr-22",
    code: "BLR-22",
    name: "12mm L joint profile",
    category: "Accessories",
    image: getImageUrl("photo_023"),
    desc: "High performance acoustic-grade 12mm L joint profile specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "12mm"
  },
  {
    id: "blr-23",
    code: "BLR-23",
    name: "System Liniam 45x45 door frame",
    category: "Door Sections",
    image: getImageUrl("photo_024"),
    desc: "Commercial strength System Liniam 45x45 door frame profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "45x45"
  },
  {
    id: "blr-24",
    code: "BLR-24",
    name: "20mm dummy cap",
    category: "Accessories",
    image: getImageUrl("photo_027"),
    desc: "High performance acoustic-grade 20mm dummy cap specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "20mm"
  },
  {
    id: "blr-25",
    code: "BLR-25",
    name: "Door Frame pettam patti 45mm",
    category: "Door Sections",
    image: getImageUrl("photo_026"),
    desc: "Commercial strength Door Frame pettam patti 45mm profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "45mm"
  },
  {
    id: "blr-26",
    code: "BLR-26",
    name: "System Liniam 45x25 Section fix",
    category: "Accessories",
    image: getImageUrl("photo_025"),
    desc: "High performance acoustic-grade System Liniam 45x25 Section fix specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "45x25"
  },
  {
    id: "blr-27",
    code: "BLR-27",
    name: "System Liniam 45x25 Section male",
    category: "Accessories",
    image: getImageUrl("photo_028"),
    desc: "High performance acoustic-grade System Liniam 45x25 Section male specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "45x25"
  },
  {
    id: "blr-28",
    code: "BLR-28",
    name: "System Liniam 45x25 Section female",
    category: "Accessories",
    image: getImageUrl("photo_029"),
    desc: "High performance acoustic-grade System Liniam 45x25 Section female specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "45x25"
  },
  {
    id: "blr-29",
    code: "BLR-29",
    name: "45mm dummy cap",
    category: "Accessories",
    image: getImageUrl("photo_030"),
    desc: "High performance acoustic-grade 45mm dummy cap specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "45mm"
  },
  {
    id: "blr-30",
    code: "BLR-30",
    name: "System Liniam 25x45 back to back",
    category: "Profiles",
    image: getImageUrl("photo_031"),
    desc: "Architectural Grade System Liniam 25x45 back to back engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "25x45"
  },
  {
    id: "blr-30a",
    code: "BLR-30A",
    name: "System Liniam 25x45 Section male back to back",
    category: "Accessories",
    image: getImageUrl("photo_032"),
    desc: "High performance acoustic-grade System Liniam 25x45 Section male back to back specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "25x45"
  },
  {
    id: "blr-31",
    code: "BLR-31",
    name: "System Liniam 25x45 Section female back to back",
    category: "Accessories",
    image: getImageUrl("photo_033"),
    desc: "High performance acoustic-grade System Liniam 25x45 Section female back to back specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "25x45"
  },
  {
    id: "blr-32",
    code: "BLR-32",
    name: "system 45x45mm portal",
    category: "Door Sections",
    image: getImageUrl("photo_034"),
    desc: "Commercial strength system 45x45mm portal profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "45x45mm"
  },
  {
    id: "blr-33",
    code: "BLR-33",
    name: "System Liniam 24 x 24 Section Fix",
    category: "Accessories",
    image: getImageUrl("photo_035"),
    desc: "High performance acoustic-grade System Liniam 24 x 24 Section Fix specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "24 x 24"
  },
  {
    id: "blr-34",
    code: "BLR-34",
    name: "System Liniam 24 x 24 Section MALE",
    category: "Accessories",
    image: getImageUrl("photo_036"),
    desc: "High performance acoustic-grade System Liniam 24 x 24 Section MALE specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "24 x 24"
  },
  {
    id: "blr-35",
    code: "BLR-35",
    name: "System Liniam 24 x 24 Section FEMALE",
    category: "Accessories",
    image: getImageUrl("photo_037"),
    desc: "High performance acoustic-grade System Liniam 24 x 24 Section FEMALE specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "24 x 24"
  },
  {
    id: "blr-36",
    code: "BLR-36",
    name: "System 35x65mm vertical style door",
    category: "Door Sections",
    image: getImageUrl("photo_038"),
    desc: "Commercial strength System 35x65mm vertical style door profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "35x65mm"
  },
  {
    id: "blr-37",
    code: "BLR-37",
    name: "System 33x75mm style door top bottom male",
    category: "Door Sections",
    image: getImageUrl("photo_039"),
    desc: "Commercial strength System 33x75mm style door top bottom male profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "33x75mm"
  },
  {
    id: "blr-38",
    code: "BLR-38",
    name: "System 33x75mm style door top bottom female",
    category: "Door Sections",
    image: getImageUrl("photo_040"),
    desc: "Commercial strength System 33x75mm style door top bottom female profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "33x75mm"
  },
  {
    id: "blr-39",
    code: "BLR-39",
    name: "system 46x78mm portal",
    category: "Door Sections",
    image: getImageUrl("photo_041"),
    desc: "Commercial strength system 46x78mm portal profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "46x78mm"
  },
  {
    id: "blr-40",
    code: "BLR-40",
    name: "system 75mm cap",
    category: "Accessories",
    image: getImageUrl("photo_042"),
    desc: "High performance acoustic-grade system 75mm cap specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "75mm"
  },
  {
    id: "blr-41",
    code: "BLR-41",
    name: "System Liniam 24x78 Section fix",
    category: "Accessories",
    image: getImageUrl("photo_043"),
    desc: "High performance acoustic-grade System Liniam 24x78 Section fix specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "24x78"
  },
  {
    id: "blr-42",
    code: "BLR-42",
    name: "system 40mm cap",
    category: "Accessories",
    image: getImageUrl("photo_044"),
    desc: "High performance acoustic-grade system 40mm cap specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "40mm"
  },
  {
    id: "blr-43",
    code: "BLR-43",
    name: "System Liniam 24x78 Section male",
    category: "Accessories",
    image: getImageUrl("photo_045"),
    desc: "High performance acoustic-grade System Liniam 24x78 Section male specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "24x78"
  },
  {
    id: "blr-44",
    code: "BLR-44",
    name: "System Liniam 24x78 Section female",
    category: "Accessories",
    image: getImageUrl("photo_046"),
    desc: "High performance acoustic-grade System Liniam 24x78 Section female specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "24x78"
  },
  {
    id: "blr-45",
    code: "BLR-45",
    name: "system 78x78mm portal",
    category: "Door Sections",
    image: getImageUrl("photo_047"),
    desc: "Commercial strength system 78x78mm portal profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "78x78mm"
  },
  {
    id: "blr-46",
    code: "BLR-46",
    name: "System 45x75mm vertical style door",
    category: "Door Sections",
    image: getImageUrl("photo_048"),
    desc: "Commercial strength System 45x75mm vertical style door profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "45x75mm"
  },
  {
    id: "blr-47",
    code: "BLR-47",
    name: "System 43x75mm style door top bottom male",
    category: "Door Sections",
    image: getImageUrl("photo_049"),
    desc: "Commercial strength System 43x75mm style door top bottom male profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "43x75mm"
  },
  {
    id: "blr-48",
    code: "BLR-48",
    name: "System 43x75mm style door top bottom female",
    category: "Door Sections",
    image: getImageUrl("photo_050"),
    desc: "Commercial strength System 43x75mm style door top bottom female profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "43x75mm"
  },
  {
    id: "blr-49",
    code: "BLR-49",
    name: "Door Frame pettam patti 56mm",
    category: "Door Sections",
    image: getImageUrl("photo_051"),
    desc: "Commercial strength Door Frame pettam patti 56mm profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "56mm"
  },
  {
    id: "blr-50",
    code: "BLR-50",
    name: "system 103x103mm portal",
    category: "Door Sections",
    image: getImageUrl("photo_052"),
    desc: "Commercial strength system103x103mm portal profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "103x103mm"
  },
  {
    id: "blr-51",
    code: "BLR-51",
    name: "system 100mm cap",
    category: "Accessories",
    image: getImageUrl("photo_053"),
    desc: "High performance acoustic-grade system 100mm cap specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "100mm"
  },
  {
    id: "blr-52",
    code: "BLR-52",
    name: "System Liniam 24x103 Section fix",
    category: "Accessories",
    image: getImageUrl("photo_054"),
    desc: "High performance acoustic-grade System Liniam 24x103 Section fix specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "24x103"
  },
  {
    id: "blr-53",
    code: "BLR-53",
    name: "system 65mm cap",
    category: "Accessories",
    image: getImageUrl("photo_055"),
    desc: "High performance acoustic-grade system 65mm cap specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "65mm"
  },
  {
    id: "blr-54",
    code: "BLR-54",
    name: "System Liniam 24x103 Section male",
    category: "Accessories",
    image: getImageUrl("photo_056"),
    desc: "High performance acoustic-grade System Liniam 24x103 Section male specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "24x103"
  },
  {
    id: "blr-55",
    code: "BLR-55",
    name: "System Liniam 24x103 Section female",
    category: "Accessories",
    image: getImageUrl("photo_057"),
    desc: "High performance acoustic-grade System Liniam 24x103 Section female specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "24x103"
  },
  {
    id: "blr-56",
    code: "BLR-56",
    name: "System 24x103 double glazing male",
    category: "Profiles",
    image: getImageUrl("photo_058"),
    desc: "Architectural Grade System 24x103 double glazing male engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "24x103"
  },
  {
    id: "blr-57",
    code: "BLR-57",
    name: "System 45x75mm vertical double glazing style door",
    category: "Door Sections",
    image: getImageUrl("photo_059"),
    desc: "Commercial strength System 45x75mm vertical double glazing style door profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "45x75mm"
  },
  {
    id: "blr-58",
    code: "BLR-58",
    name: "System 43x75mm double glazing style door top bottom male",
    category: "Door Sections",
    image: getImageUrl("photo_060"),
    desc: "Commercial strength System 43x75mm double glazing style door top bottom male profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "43x75mm"
  },
  {
    id: "blr-59",
    code: "BLR-59",
    name: "System 43x75mm double glazing style door top bottom female",
    category: "Door Sections",
    image: getImageUrl("photo_061"),
    desc: "Commercial strength System 43x75mm double glazing style door top bottom female profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "43x75mm"
  },
  {
    id: "blr-60",
    code: "BLR-60",
    name: "Aluminum Skirting 75mm",
    category: "Profiles",
    image: getImageUrl("photo_062"),
    desc: "Architectural Grade Aluminum Skirting 75mm engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "75mm"
  },
  {
    id: "blr-61",
    code: "BLR-61",
    name: "System 24x78 double glazing male",
    category: "Profiles",
    image: getImageUrl("photo_063"),
    desc: "Architectural Grade System 24x78 double glazing male engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "24x78"
  },
  {
    id: "blr-62",
    code: "BLR-62",
    name: "100mm gypsum and cap",
    category: "Accessories",
    image: getImageUrl("photo_064"),
    desc: "High performance acoustic-grade 100mm gypsum and cap specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "100mm"
  },
  {
    id: "blr-63",
    code: "BLR-63",
    name: "150mm portal cap",
    category: "Door Sections",
    image: getImageUrl("photo_065"),
    desc: "Commercial strength 150mm portal cap profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "150mm"
  },
  {
    id: "blr-64",
    code: "BLR-64",
    name: "System 24x78mm fix back to back",
    category: "Profiles",
    image: getImageUrl("photo_066"),
    desc: "Architectural Grade System 24x78mm fix back to back engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "24x78mm"
  },
  {
    id: "blr-65",
    code: "BLR-65",
    name: "System 24x103mm fix back to back",
    category: "Profiles",
    image: getImageUrl("photo_066"),
    desc: "Architectural Grade System 24x103mm fix back to back engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "24x103mm"
  },
  {
    id: "blr-66",
    code: "BLR-66",
    name: "System 24x78mm double fix back to back",
    category: "Profiles",
    image: getImageUrl("photo_067"),
    desc: "Architectural Grade System 24x78mm double fix back to back engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "24x78mm"
  },
  {
    id: "blr-67",
    code: "BLR-67",
    name: "System 24x103mm double fix back to back",
    category: "Profiles",
    image: getImageUrl("photo_068"),
    desc: "Architectural Grade System 24x103mm double fix back to back engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "24x103mm"
  },
  {
    id: "blr-68",
    code: "BLR-68",
    name: "System 16x35 glazing style door top bottom female",
    category: "Door Sections",
    image: getImageUrl("photo_069"),
    desc: "Commercial strength System 16x35 glazing style door top bottom female profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "16x35"
  },
  {
    id: "blr-69",
    code: "BLR-69",
    name: "System 16x35 fix vertical",
    category: "Profiles",
    image: getImageUrl("photo_070"),
    desc: "Architectural Grade System 16x35 fix vertical engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "16x35"
  },
  {
    id: "blr-70",
    code: "BLR-70",
    name: "System 16x35mm fix back to back",
    category: "Profiles",
    image: getImageUrl("photo_071"),
    desc: "Architectural Grade System 16x35mm fix back to back engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "16x35mm"
  },
  {
    id: "blr-71",
    code: "BLR-71",
    name: "Sticon Profile Infill 13x16",
    category: "Accessories",
    image: getImageUrl("photo_072"),
    desc: "High performance acoustic-grade Sticon Profile Infill 13x16 specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "EPDM / Silicone Rubber",
    finish: "Matte Charcoal Black / Opal Frost",
    size: "13x16"
  },
  {
    id: "blr-72",
    code: "BLR-72",
    name: "System Liniam 16x35 Section female",
    category: "Accessories",
    image: getImageUrl("photo_073"),
    desc: "High performance acoustic-grade System Liniam 16x35 Section female specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "16x35"
  },
  {
    id: "blr-73",
    code: "BLR-73",
    name: "System Liniam 16x35 Section male",
    category: "Accessories",
    image: getImageUrl("photo_074"),
    desc: "High performance acoustic-grade System Liniam 16x35 Section male specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "16x35"
  },
  {
    id: "blr-74",
    code: "BLR-74",
    name: "System Liniam 31x45 door frame",
    category: "Door Sections",
    image: getImageUrl("photo_077"),
    desc: "Commercial strength System Liniam 31x45 door frame profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "31x45"
  },
  {
    id: "blr-75",
    code: "BLR-75",
    name: "System 35x35 sliding track top",
    category: "Profiles",
    image: getImageUrl("photo_078"),
    desc: "Architectural Grade System 35x35 sliding track top engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "35x35"
  },
  {
    id: "blr-76",
    code: "BLR-76",
    name: "System 12x78 sliding track cap top",
    category: "Accessories",
    image: getImageUrl("photo_079"),
    desc: "High performance acoustic-grade System 12x78 sliding track cap top specifically engineered to provide airtight sealing, vibration dampening, or corner protection.",
    material: "High-Impact Resistant PVC / ABS",
    finish: "Solid Finished Colors",
    size: "12x78"
  },
  {
    id: "blr-77",
    code: "BLR-77",
    name: "Wideline 103x25 door frame with rebate",
    category: "Door Sections",
    image: getImageUrl("photo_082"),
    desc: "Commercial strength Wideline 103x25 door frame with rebate profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "103x25"
  },
  {
    id: "blr-77a",
    code: "BLR-77A",
    name: "system46x103mm portal",
    category: "Door Sections",
    image: getImageUrl("photo_080"),
    desc: "Commercial strength system46x103mm portal profile designed to provide ultimate durability, weather clipping, and soundproofing for partition entries.",
    material: "Grade 6063-T6 High-Strength Extruded Aluminium",
    finish: "Satin Anodized / Anodized Matte Black / Premium Powder Coated",
    size: "46x103mm"
  },
  {
    id: "blr-78",
    code: "BLR-78",
    name: "System 12x35mm sliding folding bottom",
    category: "Profiles",
    image: getImageUrl("photo_081"),
    desc: "Architectural Grade System 12x35mm sliding folding bottom engineered for precision fitting, excellent load capability, and flawless aesthetic appearance in glass walls.",
    material: "Grade 6063-T6 Extruded Aluminium",
    finish: "Anodized Silver / Matte Black / Powder Coated",
    size: "12x35mm"
  },
  {
    id: "114", code: "114", name: "8mm Glezing Gasket", category: "Accessories", image: getImageUrl("photo_084"), desc: "8mm Glezing Gasket", size: "8mm"
  },
  {
    id: "103", code: "103", name: "10mm Glezing Gasket", category: "Accessories", image: getImageUrl("photo_084"), desc: "10mm Glezing Gasket", size: "10mm"
  },
  {
    id: "105", code: "105", name: "12mm Glezing Gasket", category: "Accessories", image: getImageUrl("photo_084"), desc: "12mm Glezing Gasket", size: "12mm"
  },
  {
    id: "1841", code: "1841", name: "Door frame rabet slicon gasket", category: "Hardware", image: getImageUrl("photo_083"), desc: "Door frame rabet slicon gasket", size: "Standard Size"
  },
  {
    id: "106", code: "106", name: "Cover Gasket", category: "Accessories", image: getImageUrl("photo_085"), desc: "Cover Gasket", size: "Standard Size"
  },
  {
    id: "pvc50", code: "PVC50", name: "Skriting pvc corner 50mm", category: "Accessories", image: getImageUrl("photo_088"), desc: "Skriting pvc corner 50mm", size: "50mm"
  },
  {
    id: "pvc75", code: "PVC75", name: "Skriting pvc corner 75mm", category: "Accessories", image: getImageUrl("photo_089"), desc: "Skriting pvc corner 75mm", size: "75mm"
  },
  {
    id: "pvc100", code: "PVC100", name: "Skriting pvc corner 100mm", category: "Accessories", image: getImageUrl("photo_089"), desc: "Skriting pvc corner 100mm", size: "100mm"
  },
  {
    id: "pvc150", code: "PVC150", name: "Skriting pvc corner 150mm", category: "Accessories", image: getImageUrl("photo_089"), desc: "Skriting pvc corner 150mm", size: "150mm"
  },
  {
    id: "cvt6", code: "CVT6", name: "3mm Clear VHB Tape 6mmx7mtr", category: "Accessories", image: getImageUrl("photo_095"), desc: "3mm Clear VHB Tape 6mmx7mtr", size: "6mm"
  },
  {
    id: "cvt8", code: "CVT8", name: "3mm Clear VHB Tape 8mmx7mtr", category: "Accessories", image: getImageUrl("photo_095"), desc: "3mm Clear VHB Tape 8mmx7mtr", size: "8mm"
  },
  {
    id: "cvt10", code: "CVT10", name: "3mm Clear VHB Tape 10mmx7mtr", category: "Accessories", image: getImageUrl("photo_095"), desc: "3mm Clear VHB Tape 10mmx7mtr", size: "10mm"
  },
  {
    id: "cvt12", code: "CVT12", name: "3mm Clear VHB Tape 12mmx7mtr", category: "Accessories", image: getImageUrl("photo_095"), desc: "3mm Clear VHB Tape 12mmx7mtr", size: "12mm"
  },
  {
    id: "cvt16", code: "CVT16", name: "3mm Clear VHB Tape 16mmx7mtr", category: "Accessories", image: getImageUrl("photo_095"), desc: "3mm Clear VHB Tape 16mmx7mtr", size: "16mm"
  },
  {
    id: "mft24", code: "MFT24", name: "Mirror Mount Foam Tape 24mmx5mtr", category: "Accessories", image: getImageUrl("photo_091"), desc: "Mirror Mount Foam Tape 24mmx5mtr", size: "24mm"
  },
  {
    id: "r1-fmd-01", code: "R1-FMD-01", name: "Half door stopper", category: "Hardware", image: getImageUrl("photo_092"), desc: "Half door stopper", size: "Standard Size"
  },
  {
    id: "r1-pfs-090", code: "R1-PFS-090", name: "90kg Floor spring", category: "Hardware", image: getImageUrl("photo_093"), desc: "90kg Floor spring", size: "90kg"
  },
  {
    id: "r1-fs-120", code: "R1-FS-120", name: "120kg Floor spring", category: "Hardware", image: getImageUrl("photo_093"), desc: "120kg Floor spring", size: "120kg"
  },
  {
    id: "r1-pf-601", code: "R1-PF-601", name: "Top patch", category: "Hardware", image: getImageUrl("photo_140"), desc: "Top patch", size: "Standard Size"
  },
  {
    id: "r1-pf-602", code: "R1-PF-602", name: "Bottom patch", category: "Hardware", image: getImageUrl("photo_140"), desc: "Bottom patch", size: "Standard Size"
  },
  {
    id: "r1-pf-603", code: "R1-PF-603", name: "Bottom patch lock", category: "Hardware", image: getImageUrl("photo_141"), desc: "Bottom patch lock", size: "Standard Size"
  },
  {
    id: "top-patch-lock", code: "TOP-PATCH-LOCK", name: "Top patch lock", category: "Hardware", image: getImageUrl("photo_142"), desc: "Top patch lock", size: "Standard Size"
  },
  {
    id: "r1-pf-604", code: "R1-PF-604", name: "Top pivot", category: "Hardware", image: getImageUrl("photo_105"), desc: "Top pivot", size: "Standard Size"
  },
  {
    id: "r1-fsacc-300", code: "R1-FSACC-300", name: "For wooden door and style door accessories", category: "Hardware", image: getImageUrl("photo_143"), desc: "For wooden door and style door accessories", size: "Standard Size"
  },
  {
    id: "r1-dc-500", code: "R1-DC-500", name: "Door closer", category: "Hardware", image: getImageUrl("photo_099"), desc: "Door closer", size: "Standard Size"
  },
  {
    id: "r1-dc-2000", code: "R1-DC-2000", name: "Pelmet ARM 100kg", category: "Hardware", image: getImageUrl("photo_100"), desc: "Pelmet ARM 100kg", size: "100kg"
  },
  {
    id: "r1-dc-01", code: "R1-DC-01", name: "Mounmting Plate for door closer DC-2000", category: "Hardware", image: getImageUrl("photo_146"), desc: "Mounmting Plate for door closer DC-2000", size: "Standard Size"
  },
  {
    id: "r1-dc-1400", code: "R1-DC-1400(BOXER)", name: "Concealed door closer for 38mm door Thikness Weight Capacity:60kg Size 32mmx45mm", category: "Hardware", image: getImageUrl("photo_144"), desc: "Concealed door closer for 38mm door Thikness Weight Capacity:60kg Size 32mmx45mm", size: "32mmx45mm"
  },
  {
    id: "r1-tss-05", code: "R1-TSS-05", name: "Butterfly Hinge 5\"", category: "Hardware", image: getImageUrl("photo_151"), desc: "Butterfly Hinge 5\"", size: "5\""
  },
  {
    id: "r1-tss-04", code: "R1-TSS-04", name: "Butterfly Hinge 4\"", category: "Hardware", image: getImageUrl("photo_151"), desc: "Butterfly Hinge 4\"", size: "4\""
  },
  {
    id: "r1-sd-01", code: "R1-SD-01", name: "Profile hinge", category: "Hardware", image: getImageUrl("photo_145"), desc: "Profile hinge", size: "Standard Size"
  },
  {
    id: "r1-tss-054", code: "R1-TSS-054", name: "W to G Studio lock", category: "Hardware", image: getImageUrl("photo_105"), desc: "W to G Studio lock", size: "Standard Size"
  },
  {
    id: "r1-mh-1001", code: "R1-MH-1001", name: "Mortise handle", category: "Hardware", image: getImageUrl("photo_147"), desc: "Mortise handle", size: "Standard Size"
  },
  {
    id: "r1-mh-1003", code: "R1-MH-1003", name: "Mortise handle", category: "Hardware", image: getImageUrl("photo_148"), desc: "Mortise handle", size: "Standard Size"
  },
  {
    id: "r1-kh-03", code: "R1-KH-03", name: "Ovel key hole", category: "Hardware", image: getImageUrl("photo_109"), desc: "Ovel key hole", size: "Standard Size"
  },
  {
    id: "r1-cbsk-060", code: "R1-CBSK-060", name: "Both side key Cylinder", category: "Hardware", image: getImageUrl("photo_149"), desc: "Both side key Cylinder", size: "Standard Size"
  },
  {
    id: "r1-cbsk-070", code: "R1-CBSK-070", name: "Both side key Cylinder", category: "Hardware", image: getImageUrl("photo_149"), desc: "Both side key Cylinder", size: "Standard Size"
  },
  {
    id: "r1-cosk-060", code: "R1-COSK-060", name: "One side key & knob 60mm", category: "Hardware", image: getImageUrl("photo_150"), desc: "One side key & knob 60mm", size: "60mm"
  },
  {
    id: "r1-cosk-070", code: "R1-COSK-070", name: "One side key & knob 70mm", category: "Hardware", image: getImageUrl("photo_150"), desc: "One side key & knob 70mm", size: "70mm"
  },
  {
    id: "r1-ml-017", code: "R1-ML-017", name: "Mortise lock body", category: "Hardware", image: getImageUrl("photo_112"), desc: "Mortise lock body", size: "Standard Size"
  },
  {
    id: "r1-ml-016", code: "R1-ML-016", name: "Dead Lock", category: "Hardware", image: getImageUrl("photo_152"), desc: "Dead Lock", size: "Standard Size"
  },
  {
    id: "dds750", code: "DDS750", name: "DROP DOWN SEAL 750 mm", category: "Hardware", image: getImageUrl("photo_153"), desc: "DROP DOWN SEAL 750 mm", size: "750 mm"
  },
  {
    id: "dds850", code: "DDS850", name: "Drop down seal 850 mm", category: "Hardware", image: getImageUrl("photo_153"), desc: "Drop down seal 850 mm", size: "850 mm"
  },
  {
    id: "dds950", code: "DDS950", name: "Drop down seal 950 mm", category: "Hardware", image: getImageUrl("photo_153"), desc: "Drop down seal 950 mm", size: "950 mm"
  },
  {
    id: "dds1050", code: "DDS1050", name: "Drop down seal 1050 mm", category: "Hardware", image: getImageUrl("photo_153"), desc: "Drop down seal 1050 mm", size: "1050 mm"
  },
  {
    id: "dds1150", code: "DDS1150", name: "Drop down seal 1150 mm", category: "Hardware", image: getImageUrl("photo_153"), desc: "Drop down seal 1150 mm", size: "1150 mm"
  },
  {
    id: "all-handles", code: "HANDLES", name: "Handles", category: "Hardware", image: getImageUrl("photo_154"), desc: "All type handles are available", size: "Various Sizes"
  },
  {
    id: "d-handle", code: "D-HANDLE", name: "D Handle", category: "Hardware", image: getImageUrl("photo_155"), desc: "D handle — premium grip for sliding & swing doors", material: "Extruded Aluminium", finish: "Satin Anodized / Matte Black", size: "25x450mm, 25x300mm"
  },
  {
    id: "offside-db-handle", code: "OFFSIDE-DB", name: "Offside / DB Handle", category: "Hardware", image: getImageUrl("photo_156"), desc: "Offside / DB handle — heavy-duty pull handle for commercial doors", material: "Extruded Aluminium", finish: "Satin Anodized / Matte Black", size: "25x300mm, 25x450mm, 25x600mm"
  }
];

export default function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFinish, setSelectedFinish] = useState<string>('Black');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showHardware, setShowHardware] = useState(true);
  const getProductImage = useProductImageLookup();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Profiles', 'Door Sections', 'Accessories', 'Hardware'];

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      (product.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
      (product.code || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
      (product.desc || '').toLowerCase().includes((searchQuery || '').toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="pt-32 pb-24 bg-[#FCF9F8]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF8800]/20 bg-[#FF8800]/5 text-[#FF8800] text-xs font-bold tracking-wider mb-6 uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF8800]" />
            PRODUCT CATALOG
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-[#1C1B1B] mb-6 tracking-tight">
            Our All Products
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Browse our complete engineering list of premium BLR systems. High-rigidity profiles, custom door sections, airtight accessories, and durable hardware locks.
          </p>

          <motion.a
            href="https://drive.google.com/file/d/1YQNbXsqKcTDrV9JimPmUNg1wX9cN1goU/view"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-6 py-3 mt-8 rounded-full bg-[#FF8800] text-white text-sm font-bold shadow-lg shadow-[#FF8800]/30 hover:shadow-[#FF8800]/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            Download Our Catalogue
          </motion.a>
        </div>

        <div className="mb-12 bg-white rounded-2xl border border-slate-200/60 p-4 shadow-sm flex flex-col md:flex-row items-center gap-4 relative z-30">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by code or name... (e.g. BLR-01)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#FF8800] focus:ring-2 focus:ring-[#FF8800]/10 outline-none text-xs font-semibold bg-[#FCF9F8] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="h-[1px] w-full md:w-[1px] md:h-8 bg-slate-200" />

          <div className="hidden lg:flex items-center gap-2 overflow-x-auto w-full">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 pl-2 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#FF8800]/10 text-[#FF8800] border border-[#FF8800]/30'
                      : 'border border-slate-200/50 hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat === 'All' ? `All Products (${productsData.length})` : cat}
                </button>
              );
            })}
          </div>

          <div className="lg:hidden relative w-full md:w-56">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-[#FCF9F8] flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all outline-none"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                {selectedCategory === 'All' ? `All Products (${productsData.length})` : selectedCategory}
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200/80 z-50 overflow-hidden"
                >
                  <div className="py-1">
                    {categories.map((cat) => {
                      const isActive = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => { setSelectedCategory(cat); setIsDropdownOpen(false); }}
                          className={`w-full text-left px-4 py-3 text-xs font-bold flex items-center justify-between transition-colors ${
                            isActive ? 'bg-[#FFF0E0] text-[#FF8800]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          {cat === 'All' ? `All Products (${productsData.length})` : cat}
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF8800]" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="ml-auto shrink-0 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/30">
            Filtered: {filteredProducts.length} items
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="space-y-16">
            {filteredProducts.filter(p => !!p.code.match(/^BLR-/i) && (parseInt(p.code.replace(/[^0-9]/g, '')) <= 78)).length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-black text-[#1C1B1B]">VLP Series</h2>
                  <div className="h-[1px] flex-1 bg-slate-200 mt-2"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts
                    .filter(p => !!p.code.match(/^BLR-/i) && (parseInt(p.code.replace(/[^0-9]/g, '')) <= 78))
                    .map((product, index) => (
                      <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.4, delay: index * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-2xl border border-slate-200/50 hover:border-[#FF8800]/20 shadow-sm hover:shadow-lg hover:shadow-[#FF8800]/5 transition-all duration-300 flex flex-col overflow-hidden group/card"
                      >
                        <div
                          className="relative aspect-square w-full bg-[#F1F5F9]/30 border-b border-slate-100 flex items-center justify-center p-6 overflow-hidden group/img cursor-pointer"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <div className="absolute inset-0 bg-[#FF8800]/0 group-hover/img:bg-slate-900/5 transition-all duration-300 flex items-center justify-center pointer-events-none z-10" />
                          <div className="relative w-full h-full flex items-center justify-center rounded-lg">
                            <ImageWithSkeleton
                              src={getProductImage(product.name, product.image)}
                              alt={product.name}
                              className="max-w-[85%] max-h-[85%] object-contain"
                            />
                          </div>
                          <div className="absolute top-3.5 left-3.5 z-20">
                            <span className="text-[9px] font-bold tracking-wider text-slate-600 bg-slate-100/90 border border-slate-200/50 px-2.5 py-1 rounded-full uppercase shadow-xs">
                              {product.category}
                            </span>
                          </div>
                          <div className="absolute top-3.5 right-3.5 z-20">
                            <span className="text-[10px] font-black tracking-tight text-[#FF8800] bg-[#FFF0E0] border border-[#FF8800]/20 px-2.5 py-1 rounded-full font-mono">
                              {product.code}
                            </span>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                            <div className="bg-[#FF8800] text-white rounded-full p-2.5 shadow-xl">
                              <ZoomIn className="w-5 h-5" />
                            </div>
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-[14px] font-bold text-[#1C1B1B] tracking-tight leading-snug mb-2 font-sans group-hover/card:text-[#FF8800] transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-[11.5px] leading-relaxed text-slate-500 mb-4 line-clamp-3">
                            {product.desc}
                          </p>

                          <div className="space-y-1.5 mt-auto bg-[#FCF9F8] border border-slate-100/80 p-3 rounded-xl mb-4 text-[11px]">
                            <div className="flex justify-between items-center text-slate-500">
                              <span className="font-medium">Material</span>
                              <span className="font-bold text-slate-800 text-right truncate max-w-[130px]" title={product.material}>
                                {(product.material || '').replace('Extruded ', '').replace('Architectural ', '')}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-slate-500">
                              <span className="font-medium">Sizes / Fit</span>
                              <span className="font-bold text-slate-800 text-right truncate max-w-[130px] font-mono">
                                {product.size}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-slate-500">
                              <span className="font-medium">Standard Finish</span>
                              <span className="font-bold text-slate-800 text-right truncate max-w-[130px]" title={product.finish}>
                                {product.finish}
                              </span>
                            </div>
                          </div>

                          <a
                            href={`https://wa.me/919100044124?text=Hi!%20I%20want%20to%20inquire%20about%20product:%20${encodeURIComponent(product.code)}%20-%20${encodeURIComponent(product.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 rounded-xl bg-[#FF8800] text-white text-xs font-bold hover:bg-[#E67700] active:bg-[#D66600] transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer text-center"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            Inquire on WhatsApp
                          </a>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            )}

            {filteredProducts.filter(p => !(!!p.code.match(/^BLR-/i) && (parseInt(p.code.replace(/[^0-9]/g, '')) <= 78))).length > 0 && (
              <div>
                <motion.div
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6 mb-8 rounded-2xl bg-gradient-to-r from-[#0A3D73] to-[#062a4f] text-white cursor-pointer shadow-lg hover:shadow-xl transition-all group"
                  onClick={() => setShowHardware(!showHardware)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.995 }}
                >
                  <div>
                    <span className="text-[#FF8800] font-bold tracking-widest text-[10px] uppercase mb-1 block">ACCESSORIES & HARDWARE</span>
                    <h2 className="text-2xl md:text-3xl font-black">Components & Handles</h2>
                    <p className="text-slate-300 text-sm mt-1 max-w-xl">Premium gaskets, tapes, handles, locks, and structural components to complete your partition system.</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                    <span className="text-sm font-bold">{showHardware ? 'Hide' : 'View'}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showHardware ? 'rotate-180' : ''}`} />
                  </div>
                </motion.div>

                <AnimatePresence>
                  {showHardware && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
                        {filteredProducts
                          .filter(p => !(!!p.code.match(/^BLR-/i) && (parseInt(p.code.replace(/[^0-9]/g, '')) <= 78)))
                          .map((product, index) => (
                            <motion.div
                              layout
                              key={product.id}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: '-40px' }}
                              transition={{ duration: 0.4, delay: index * 0.02, ease: [0.25, 0.1, 0.25, 1] }}
                              whileHover={{ y: -5 }}
                              className="bg-white rounded-2xl border border-slate-200/50 hover:border-[#FF8800]/20 shadow-sm hover:shadow-lg hover:shadow-[#FF8800]/5 transition-all duration-300 flex flex-col overflow-hidden group/card"
                            >
                              <div
                                className="relative aspect-square w-full bg-[#F1F5F9]/30 border-b border-slate-100 flex items-center justify-center p-6 overflow-hidden group/img cursor-pointer"
                                onClick={() => setSelectedProduct(product)}
                              >
                                <div className="absolute inset-0 bg-[#FF8800]/0 group-hover/img:bg-slate-900/5 transition-all duration-300 flex items-center justify-center pointer-events-none z-10" />
                                <div className="relative w-full h-full flex items-center justify-center rounded-lg">
                                  <ImageWithSkeleton
                                    src={getProductImage(product.name, product.image)}
                                    alt={product.name}
                                    className="max-w-[85%] max-h-[85%] object-contain"
                                  />
                                </div>
                                <div className="absolute top-3.5 left-3.5 z-20">
                                  <span className="text-[9px] font-bold tracking-wider text-slate-600 bg-slate-100/90 border border-slate-200/50 px-2.5 py-1 rounded-full uppercase shadow-xs">
                                    {product.category}
                                  </span>
                                </div>
                                <div className="absolute top-3.5 right-3.5 z-20">
                                  <span className="text-[10px] font-black tracking-tight text-[#FF8800] bg-[#FFF0E0] border border-[#FF8800]/20 px-2.5 py-1 rounded-full font-mono">
                                    {product.code}
                                  </span>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                                  <div className="bg-[#FF8800] text-white rounded-full p-2.5 shadow-xl">
                                    <ZoomIn className="w-5 h-5" />
                                  </div>
                                </div>
                              </div>

                              <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-[14px] font-bold text-[#1C1B1B] tracking-tight leading-snug mb-2 font-sans group-hover/card:text-[#FF8800] transition-colors">
                                  {product.name}
                                </h3>
                                <p className="text-[11.5px] leading-relaxed text-slate-500 mb-4 line-clamp-3">
                                  {product.desc}
                                </p>

                                <div className="space-y-1.5 mt-auto bg-[#FCF9F8] border border-slate-100/80 p-3 rounded-xl mb-4 text-[11px]">
                                  <div className="flex justify-between items-center text-slate-500">
                                    <span className="font-medium">Material</span>
                                    <span className="font-bold text-slate-800 text-right truncate max-w-[130px]" title={product.material}>
                                      {(product.material || '').replace('Extruded ', '').replace('Architectural ', '')}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center text-slate-500">
                                    <span className="font-medium">Sizes / Fit</span>
                                    <span className="font-bold text-slate-800 text-right truncate max-w-[130px] font-mono">
                                      {product.size}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center text-slate-500">
                                    <span className="font-medium">Standard Finish</span>
                                    <span className="font-bold text-slate-800 text-right truncate max-w-[130px]" title={product.finish}>
                                      {product.finish}
                                    </span>
                                  </div>
                                </div>

                                <a
                                  href={`https://wa.me/919100044124?text=Hi!%20I%20want%20to%20inquire%20about%20product:%20${encodeURIComponent(product.code)}%20-%20${encodeURIComponent(product.name)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full py-2.5 rounded-xl bg-[#FF8800] text-white text-xs font-bold hover:bg-[#E67700] active:bg-[#D66600] transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer text-center"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  Inquire on WhatsApp
                                </a>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-200/65 shadow-sm">
            <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Products Match Your Search</h3>
            <p className="text-slate-500 text-xs font-medium max-w-sm mx-auto">
              We couldn't find any BLR products matching "{searchQuery}" in category "{selectedCategory}". Try searching for another profile or clear filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-6 px-5 py-2 text-xs font-bold border border-slate-200/50 text-[#FF8800] rounded-xl hover:bg-[#FF8800]/5 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}

        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 p-4 md:p-8 overflow-y-auto"
            >
              <div className="min-h-full flex items-center justify-center w-full my-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                   transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-gradient-to-br from-[#FF8800] to-[#E67700] w-full max-w-4xl rounded-3xl shadow-2xl relative flex flex-col"
                >
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-5 right-6 text-white text-4xl font-light hover:text-white/80 transition-colors z-30 leading-none"
                  >
                    &times;
                  </button>

                  <div className="p-6 md:p-8 pb-10">
                    <p className="text-white/80 text-sm mb-2 uppercase tracking-wider font-semibold">VISTALINE • Premium Profiles</p>

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 pr-8 leading-tight">
                      {selectedProduct.name}
                    </h2>

                    <div className="bg-white rounded-2xl p-4 md:p-8 mb-6 shadow-xl relative group isolate overflow-hidden flex items-center justify-center">
                      <TransformWrapper
                        initialScale={1}
                        minScale={1}
                        maxScale={4}
                        centerOnInit={true}
                        wheel={{ smoothStep: 0.005 }}
                        pinch={{ step: 5 }}
                      >
                        {() => (
                          <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <ImageWithSkeleton
                              src={getProductImage(selectedProduct.name, selectedProduct.image)}
                              alt={selectedProduct.name}
                              className="w-full h-[300px] md:h-[450px] object-contain relative z-10 cursor-zoom-in active:cursor-grabbing"
                            />
                          </TransformComponent>
                        )}
                      </TransformWrapper>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div className="bg-white/10 border border-white/20 rounded-2xl p-5 shadow-sm">
                        <p className="text-white/70 text-sm font-medium tracking-wide">PRODUCT CODE</p>
                        <h3 className="text-2xl text-white font-bold mt-2 font-mono">
                          {selectedProduct.code}
                        </h3>
                      </div>
                      <div className="bg-white/10 border border-white/20 rounded-2xl p-5 shadow-sm">
                        <p className="text-white/70 text-sm font-medium tracking-wide">STANDARD SIZE / FIT</p>
                        <h3 className="text-xl text-white font-bold mt-2 font-sans truncate" title={selectedProduct.size}>
                          {selectedProduct.size}
                        </h3>
                      </div>
                    </div>

                    <div className="bg-white/10 border border-white/20 rounded-2xl p-5 mb-6 shadow-sm">
                      <p className="text-white/70 text-sm mb-3 font-medium tracking-wide border-b border-white/10 pb-2">AVAILABLE FINISH</p>
                      <div className="flex gap-3 flex-wrap">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedFinish('Black'); }}
                          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${selectedFinish === 'Black' ? 'bg-black text-white shadow-md scale-105' : 'bg-white/20 text-white hover:bg-white/30'}`}
                        >
                          Black
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedFinish('Silver'); }}
                          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${selectedFinish === 'Silver' ? 'bg-slate-200 text-black shadow-md scale-105' : 'bg-white/20 text-white hover:bg-white/30'}`}
                        >
                          Silver
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedFinish('Custom'); }}
                          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${selectedFinish === 'Custom' ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-white/20 text-white hover:bg-white/30'}`}
                        >
                          Custom Color
                        </button>
                      </div>
                    </div>

                    <div className="bg-white/10 border border-white/20 rounded-2xl p-5 mb-6 shadow-sm">
                      <p className="text-white/70 text-sm mb-3 font-medium tracking-wide border-b border-white/10 pb-2">MATERIAL DETAILS</p>
                      <p className="text-white/90 text-sm leading-relaxed mb-3 font-medium">
                        {selectedProduct.material}
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed italic">
                        "{selectedProduct.desc}"
                      </p>
                    </div>

                    <div className="bg-white text-slate-800 rounded-xl p-4 mb-6 text-sm font-medium shadow-md flex items-center gap-3">
                      <div className="bg-green-100 text-green-700 p-1.5 rounded-full shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Live pricing, stock availability & delivery confirmation instantly on WhatsApp.</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 relative z-20">
                      <a
                        href={`https://wa.me/919100044124?text=Hi!%20I%20want%20to%20inquire%20about%20product:%20${encodeURIComponent(selectedProduct.code)}%20-%20${encodeURIComponent(selectedProduct.name)}%20(${encodeURIComponent(selectedFinish)}%20Finish)`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-lime-400 hover:bg-lime-500 transition-colors duration-300 text-slate-900 font-extrabold py-4 rounded-2xl text-center text-lg flex justify-center items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Get Best Price on WhatsApp
                      </a>
                      <a
                        href="tel:+919100044124"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-white/10 border-2 border-white/30 hover:bg-white/20 transition-all duration-300 text-white font-bold py-4 rounded-2xl text-center text-lg flex justify-center items-center gap-2 shadow-lg hover:-translate-y-0.5"
                      >
                        Call Now
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
