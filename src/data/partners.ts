export type PartnersDataType = {
  name: string;
  logo: string;
  type: ("Publishers" | "Data" | "DSP" | "CDP")[];
  featured?: boolean;
  order?: number;
}[];

export const partnersData: PartnersDataType = [
  {
    name: "3+",
    logo: "CH3-logo.png",
    type: ["Publishers"],
  },
  {
    name: "4 GTV TV",
    logo: "4GTV.tv-logo_2022-07-12-203714_dakq.png",
    type: ["Publishers"],
  },
  {
    name: "Action IQ",
    logo: "actioniq-logo.png",
    type: ["CDP"],
  },
  {
    name: "Acxiom",
    logo: "Acxiom-2022-Logo-NAVY-and-TEAL.jpg",
    type: ["Data"],
    featured: true,
    order: 1,
  },
  {
    name: "Ad Generation",
    logo: "PartnerLogo_AdGeneration_580x250.png",
    type: ["DSP"],
  },
  {
    name: "Admicro",
    logo: "Admicro_logo-580x250.png",
    type: ["DSP"],
  },
  {
    name: "Adobe",
    logo: "Adobe_Corporate_Logo-580x250.png",
    type: ["Data", "CDP"],
    featured: true,
    order: 2,
  },
  {
    name: "Adobe Advertising",
    logo: "adobe-advertising.png",
    type: ["DSP"],
  },
  {
    name: "Adsquare",
    logo: "PartnerLogo_Adsquare_580x256.png",
    type: ["Data"],
  },
  {
    name: "Adswizz",
    logo: "PartnerLogo_Adswizz_580x250.png",
    type: ["DSP"],
  },
  {
    name: "AJA SSP",
    logo: "PartnerLogo_AJA-SSP_580x250.png",
    type: ["DSP"],
  },
  {
    name: "Alliant",
    logo: "PartnerLogo_Alliant_256x256.png",
    type: ["Data"],
    featured: true,
    order: 4,
  },
  {
    name: "All About",
    logo: "allabout_logo_580x250.png",
    type: ["Publishers"],
  },
  {
    name: "AlikeAudience",
    logo: "AlikeAudience.png",
    type: ["Data"],
    featured: true,
    order: 3,
  },
  {
    name: "AMC Networks",
    logo: "AMC_Networks_logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Ameba",
    logo: "Ameba_logo_580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Amobee",
    logo: "Amobee.png",
    type: ["DSP"],
  },
  {
    name: "Amperity",
    logo: "amperity-logo.png",
    type: ["CDP"],
  },
  {
    name: "Angle Tech",
    logo: "AngleTech.png",
    type: ["Data"],
  },
  {
    name: "Aotter",
    logo: "aotter_logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "AppLovin",
    logo: "AppLovin_Logo_580x250.png",
    type: ["Publishers", "DSP", "Data"],
  },
  {
    name: "ARN",
    logo: "PartnerLogo_ARN_256x256.png",
    type: ["Publishers"],
  },
  {
    name: "Aseal",
    logo: "Aseal-Logo.png",
    type: ["Data"],
  },
  {
    name: "Attain",
    logo: "Attain_Logo_Black_580x250.png",
    type: ["Data"],
  },
  {
    name: "Audigent",
    logo: "audient_logo.png",
    type: ["Data"],
    featured: true,
    order: 5,
  },
  {
    name: "AWS",
    logo: "aws-logo.svg",
    type: ["CDP"],
  },
  {
    name: "BabyCalendar",
    logo: "BabyCalendar.png",
    type: ["Publishers"],
  },
  {
    name: "Beachfront",
    logo: "beachfront-logo.png",
    type: ["DSP"],
  },
  {
    name: "BluID",
    logo: "blu_logo.png",
    type: ["Data"],
  },
  {
    name: "Bidswitch",
    logo: "PartnerLogo_Bidswitch_580x250.png",
    type: ["DSP"],
  },
  {
    name: "Billboard",
    logo: "billboard-logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Blueconic",
    logo: "blueconic.png",
    type: ["CDP"],
  },
  {
    name: "Bombora",
    logo: "bombora-logo.png",
    type: ["Data"],
  },
  {
    name: "Bridg",
    logo: "Bridg.png",
    type: ["CDP"],
  },
  {
    name: "BuzzFeed",
    logo: "BuzzFeed_Logo_580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Cadent",
    logo: "cadent.png",
    type: ["DSP"],
  },
  {
    name: "Centillion",
    logo: "centillion-logo.png",
    type: ["Data"],
  },
  {
    name: "Cinema Café",
    logo: "cinema-cafe-logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Circana",
    logo: "Circana_Logo.png",
    type: ["Data"],
  },
  {
    name: "coc coc",
    logo: "CocCoc_RGB.png",
    type: ["Publishers"],
  },
  {
    name: "Comscore",
    logo: "PartnerLogo_Comscore_580x250.png",
    type: ["Data"],
    featured: true,
    order: 6,
  },
  {
    name: "Cross Target",
    logo: "CrossTarget.png",
    type: ["DSP"],
  },
  {
    name: "Deadline",
    logo: "Deadline_logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "deepintent",
    logo: "deepintent.png",
    type: ["DSP"],
  },
  {
    name: "Dek-D",
    logo: "ddlogo_orn_a 2.png",
    type: ["Publishers"],
  },
  {
    name: "Disney",
    logo: "disney-logo.png",
    type: ["Publishers"],
  },
  {
    name: "Dish Media",
    logo: "Dish-Media-Logo.png",
    type: ["Publishers"],
  },
  {
    name: "Dotdash Meredith",
    logo: "DotdashMeredith_Logo_BLK.png",
    type: ["Publishers"],
  },
  {
    name: "Environics",
    logo: "environics-analytics-logo2.png",
    type: ["CDP"],
  },
  {
    name: "Experian",
    logo: "Experian.svg",
    type: ["Data"],
    featured: true,
    order: 7,
  },
  {
    name: "Eyeota",
    logo: "PartnerLogo_Eyeota_580x250.png",
    type: ["Data"],
    featured: true,
    order: 19,
  },
  {
    name: "Fluct",
    logo: "Fluct_logo-580x250.png",
    type: ["DSP"],
  },
  {
    name: "FLUX Inc.",
    logo: "FLUX_Logo_fix-1_BL.png",
    type: ["DSP"],
  },
  {
    name: "FourM Inc.",
    logo: "fourm_company_logo.png",
    type: ["DSP"],
  },
  {
    name: "Foursquare",
    logo: "PartnerLogo_Foursquare_580x250.png",
    type: ["Data"],
    featured: true,
    order: 8,
  },
  {
    name: "FPT Play",
    logo: "VN_FPT Play.png",
    type: ["Publishers"],
  },
  {
    name: "Freak Out",
    logo: "PartnerLogo_FreakOut_580x250.png",
    type: ["DSP"],
  },
  {
    name: "FreeWheel",
    logo: "freewheel.png",
    type: ["Publishers"],
  },
  {
    name: "Fubo TV",
    logo: "PartnerLogo_FuboTV_256x256.png",
    type: ["Publishers"],
  },
  {
    name: "Gamma",
    logo: "PartnerLogo_Gamma_580x250.png",
    type: ["DSP"],
  },
  {
    name: "GetOne",
    logo: "GetOne.png",
    type: ["Data"],
  },
  // {
  //   name: "Gum Gum",
  //   logo: "PartnerLogo_gumgum_580x250.png",
  //   type: ["DSP"],
  // },
  {
    name: "GrowthLoop",
    logo: "GrowthLoop.png",
    type: ["CDP"],
  },
  {
    name: "Habu",
    logo: "Habu.png",
    type: ["CDP"],
  },
  {
    name: "Haystack News",
    logo: "Haystack-logo.png",
    type: ["Publishers"],
  },
  {
    name: "Hello Health Group",
    logo: "HHG1000px.png",
    type: ["Publishers"],
  },
  {
    name: "Hightouch",
    logo: "hightouch-logo.jpg",
    type: ["CDP"],
  },
  {
    name: "Hipwee",
    logo: "hipwee-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Hochi Shimbun",
    logo: "hochi-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Hotai",
    logo: "hotai-logo.png",
    type: ["Data"],
  },
  {
    name: "HK01",
    logo: "HK01-logo.png",
    type: ["Publishers"],
  },
  {
    name: "i Cook",
    logo: "PartnerLogo_iCook_256x256.png",
    type: ["Publishers", "Data"],
  },
  {
    name: "Index Exchange",
    logo: "Index_Exchange_Logo_2021.png",
    type: ["DSP"],
  },
  // {
  //   name: "Infosum",
  //   logo: "InfoSum_Logo-580x250.png",
  //   type: ["CDP"],
  // },
  {
    name: "InTouch",
    logo: "InTouch_Logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Kargo",
    logo: "PartnerLogo_Kargo_580x250.png",
    type: ["DSP"],
  },
  {
    name: "KG Media",
    logo: "KG-Media-518x250.png",
    type: ["Publishers"],
  },
  {
    name: "LA Times",
    logo: "LA-Times_logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Lasso",
    logo: "lasso-logo-580x250.png",
    type: ["Data"],
    featured: true,
    order: 9,
  },
  {
    name: "Lifesight",
    logo: "Lifesight-Logo-580x250.png",
    type: ["Data"],
    featured: true,
    order: 10,
  },
  {
    name: "Life & Style",
    logo: "LifeStyle_logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "LineTV",
    logo: "LineTV.png",
    type: ["Publishers"],
  },
  {
    name: "LiSTNR",
    logo: "PartnerLogo_LiSTNR_256x256.png",
    type: ["Publishers"],
  },
  {
    name: "LiTV",
    logo: "LiTV-logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Live Intent",
    logo: "PartnerLogo_LiveIntent_580x250.png",
    type: ["DSP"],
    featured: true,
    order: 11,
  },
  {
    name: "LiveRamp",
    logo: "liveramp-logo-black.svg",
    type: ["Data", "CDP"],
    featured: true,
    order: 12,
  },
  {
    name: "LnData",
    logo: "Lndata.png",
    type: ["Data"],
  },
  {
    name: "Lotame",
    logo: "lotame-logo.png",
    type: ["Data"],
  },
  {
    name: "Lotte Members",
    logo: "lottemembers.png",
    type: ["Data"],
  },
  {
    name: "Lucid",
    logo: "partner-logo-lucid.jpg",
    type: ["Data"],
    featured: true,
    order: 13,
  },
  {
    name: "Lytics",
    logo: "Lytics.png",
    type: ["CDP"],
  },
  {
    name: "Magnite",
    logo: "Magnite_logo-580x250.png",
    type: ["DSP"],
  },
  {
    name: "Mainichi Shimbun",
    logo: "mainichi580x250.jpg",
    type: ["Publishers"],
  },
  {
    name: "McClatchy",
    logo: "mcc-logo-horizontal-black.svg",
    type: ["Publishers"],
  },
  {
    name: "Media Tradecraft",
    logo: "MediaTradecraft_Logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Mediavine",
    logo: "Mediavine.png",
    type: ["Publishers"],
  },
  {
    name: "Media Wallah",
    logo: "Mediawallah_logo-580x250.png",
    type: ["Data"],
  },
  {
    name: "Meitu",
    logo: "Meitu_logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "MicroAd",
    logo: "MicroAd_COMPASS_580x250.png",
    type: ["DSP"],
  },
  {
    name: "Mingpao",
    logo: "MP-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "mParticle",
    logo: "mparticle-logo.png",
    type: ["CDP"],
  },
  {
    name: "Motiv-i",
    logo: "MI_LOGO_500x240.png",
    type: ["DSP"],
  },
  {
    name: "Muscle & Fitness",
    logo: "MuscleFitness_Logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "my TV SUPER",
    logo: "PartnerLogo_myTV-SUPER_256x256.png",
    type: ["Publishers"],
  },
  {
    name: "Narrative",
    logo: "narrative-logo.png",
    type: ["CDP"],
  },
  {
    name: "NBC Universal",
    logo: "NBCuniversal.png",
    type: ["Publishers"],
  },
  {
    name: "Netwise",
    logo: "PartnerLogo_Netwise_580x250.png",
    type: ["Data"],
  },
  {
    name: "Networld",
    logo: "networld.png",
    type: ["Data"],
  },
  {
    name: "Neustar",
    logo: "PartnerLogo_Neustar_256x256.png",
    type: ["Data", "CDP"],
    featured: true,
    order: 14,
  },
  {
    name: "News Cafe",
    logo: "newscafe-logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Newsweek",
    logo: "Newsweek_logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Next",
    logo: "next-partner-logo-580.png",
    type: ["Publishers"],
  },
  {
    name: "Nielsen",
    logo: "PartnerLogo_Nielsen_580x250.png",
    type: ["Data"],
    featured: true,
    order: 15,
  },
  {
    name: "Nova Entertainment",
    logo: "Nova-Entertainment-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "NRich",
    logo: "NRich.png",
    type: ["DSP"],
  },
  {
    name: "OnAudience",
    logo: "OnAudience_logo.png",
    type: ["Data"],
  },
  {
    name: "Open X",
    logo: "PartnerLogo_OpenX_580x250.png",
    type: ["DSP"],
  },
  {
    name: "Optable",
    logo: "optable-logo.png",
    type: ["CDP"],
  },
  {
    name: "Oracle",
    logo: "Oracle_Advertising_580x250.png",
    type: ["Data"],
    featured: true,
    order: 16,
  },
  {
    name: "Pass3",
    logo: "PASS3_Logo-02.png",
    type: ["DSP"],
  },
  {
    name: "Paramount",
    logo: "Paramount.png",
    type: ["Publishers"],
  },
  {
    name: "Penske Media Corp PMC",
    logo: "PartnerLogo_Penske-Media-Corp-PMC_256x256.png",
    type: ["Publishers"],
  },
  {
    name: "Philo",
    logo: "Philo_logo.png",
    type: ["Publishers"],
  },
  {
    name: "Pixnet",
    logo: "pixnet-logo.png",
    type: ["Data"],
  },
  {
    name: "Proper Media",
    logo: "ProperMedia_logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Pub Matic",
    logo: "PartnerLogo_PubMatic_580x250.png",
    type: ["DSP"],
  },

  {
    name: "Qiyi",
    logo: "PartnerLogo_iQiyi_256x256.png",
    type: ["Publishers"],
  },
  {
    name: "Raptive",
    logo: "Raptive_2023.svg",
    type: ["Publishers"],
  },
  {
    name: "RBB Today",
    logo: "rbb-today-logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Retty Inc.",
    logo: "Retty_rgb_logotype-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Rolling Stone",
    logo: "Rolling-Stone_logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Rudderstack",
    logo: "rudderstack.png",
    type: ["CDP"],
  },
  {
    name: "Salesforce",
    logo: "salesforce-logo.png",
    type: ["Data", "CDP"],
    featured: true,
    order: 17,
  },
  {
    name: "Salon",
    logo: "salon_logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "SCA",
    logo: "PartnerLogo_SCA_256x256.png",
    type: ["Publishers"],
  },
  {
    name: "SeedTag",
    logo: "Seedtag.png",
    type: ["DSP"],
  },
  {
    name: "Sehat",
    logo: "Logo-SehatQ-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "ShareThis",
    logo: "ShareThis.png",
    type: ["Data"],
  },
  {
    name: "Sharethrough",
    logo: "str-logo.png",
    type: ["DSP"],
  },
  {
    name: "Simon Data",
    logo: "simon.png",
    type: ["CDP"],
  },
  {
    name: "Skyperfect JSAT",
    logo: "skyperfect-logo-700x400.png",
    type: ["Publishers", "Data"],
  },
  {
    name: "Slate",
    logo: "slate.png",
    type: ["Publishers"],
  },
  {
    name: "Sling",
    logo: "sling-logo.png",
    type: ["Publishers"],
  },
  {
    name: "Smrtr",
    logo: "smrtr-logo-518x250.png",
    type: ["Data"],
  },
  {
    name: "Snowflake",
    logo: "snowflake-logo-580x250.png",
    type: ["Data", "CDP"],
    featured: true,
    order: 18,
  },
  {
    name: "Sovrn",
    logo: "PartnerLogo_Sovrn_580x250.png",
    type: ["DSP"],
  },
  {
    name: "Sports Illustrated",
    logo: "sports-illustrated_black_580x250.png",
    type: ["Publishers"],
  },
  {
    name: "SpotX",
    logo: "PartnerLogo_SpotX_580x250.png",
    type: ["DSP"],
  },
  {
    name: "Summit Media",
    logo: "Summit_Media_logo.png",
    type: ["Publishers"],
  },
  {
    name: "Surfside",
    logo: "Surfside.png",
    type: ["DSP"],
  },
  {
    name: "Tapad",
    logo: "PartnerLogo_Tapad_580x250.png",
    type: ["Data"],
  },
  {
    name: "Tealium",
    logo: "tealium.png",
    type: ["CDP"],
  },
  {
    name: "Thairath",
    logo: "Thairath_Online_Logo2023.png",
    type: ["Publishers"],
  },
  {
    name: "Thanh Nien",
    logo: "logo_ThanhNien-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "The Hollywood Reporter",
    logo: "hollywood-reporter_logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "TheMediaGrid",
    logo: "TMG-Rebrand-2021-Logo-RGB-Poli-K43-1.png",
    type: ["DSP"],
  },
  {
    name: "The News Lens",
    logo: "The-News-Lens-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "The San Diego Union Tribune",
    logo: "SD-Union-Tribune_logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "The Washington Post",
    logo: "WashingtonPost_logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Throtle",
    logo: "Throtle_Logo_580x250.png",
    type: ["Data"],
  },
  {
    name: "TNL Media Group",
    logo: "TNL-Media-Group-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Treasure Data",
    logo: "treasure-data-logo.svg",
    type: ["CDP"],
  },
  {
    name: "TripleLift",
    logo: "triplelift-logo.png",
    type: ["DSP"],
  },
  {
    name: "TrueData",
    logo: "TrueData-580x250.png",
    type: ["Data"],
  },
  {
    name: "True Digital",
    logo: "LogoTrueID Corporate.png",
    type: ["Publishers"],
  },
  {
    name: "Tubi",
    logo: "tubi-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Twilio Segment",
    logo: "twilio-logo.png",
    type: ["CDP"],
  },
  {
    name: "ucfunnel",
    logo: "PartnerLogo_ucfunnel_580x250.png",
    type: ["DSP"],
  },
  {
    name: "Unruly",
    logo: "UnwindLogo.png",
    type: ["Publishers"],
  },
  {
    name: "Unwind Media",
    logo: "PartnerLogo_Unruly_580x250.png",
    type: ["DSP"],
  },
  {
    name: "US Weekly",
    logo: "Us-Weekly-logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "USNews & world report",
    logo: "USNews.png",
    type: ["Publishers"],
  },
  {
    name: "Variety",
    logo: "Variety_logo-580x250.png",
    type: ["Publishers"],
  },
  {
    name: "Verve",
    logo: "PartnerLogo_Verve_580x250.png",
    type: ["DSP"],
  },
  {
    name: "VNExpress",
    logo: "VNExpress.png",
    type: ["Publishers"],
  },
  {
    name: "WBD",
    logo: "WBD_logo.webp",
    type: ["Publishers"],
  },
  {
    name: "WeTV",
    logo: "WeTV logo_1200x628_.png",
    type: ["Publishers"],
  },
  {
    name: "Windfall",
    logo: "Logo_Windfall_580x250.png",
    type: ["Data"],
  },
  {
    name: "Xandr",
    logo: "Xandr-Logo.png",
    type: ["DSP"],
  },
  {
    name: "Yield One",
    logo: "PartnerLogo_YieldOne_580x250.png",
    type: ["DSP"],
  },
];
