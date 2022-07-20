import { ICountry } from '.';

export interface ITalentAchievementDTO {
  id: number;
  date?: string;
  name: string;
  talent_id: number;
  prize?: string;
}

export interface ITalentFootnoteDTO {
  id: number;
  description?: string;
  talent_id: number;
  title?: string;
  url?: string;
}

export interface ITalentSocialDTO {
  id: number;
  talent_id: number;
  social_id: number;
  url: string;
  type: string;
}

export interface ITalentDTO {
  id: number;
  biography?: string;
  country_id: number;
  description?: string;
  dob?: string;
  image?: string;
  image_fullpath?: string;
  nickname: string;
  name?: string;
  role?: string;
  slug: string;
  status: number;
  talent_achievements: ITalentAchievementDTO[];
  talent_footnotes: ITalentFootnoteDTO[];
  talent_social_links: ITalentSocialDTO[];
  total_earnings?: string;
}

export interface ITalentAchievement {
  id: number;
  date?: string;
  name: string;
  talentId: number;
  prize?: string;
}

export interface ITalentFootnote {
  id: number;
  description?: string;
  talentId: number;
  title?: string;
  url?: string;
}

export interface ITalentSocial {
  id: number;
  talentId: number;
  socialId: number;
  url: string;
  type: string;
}

export interface ITalent {
  id: number;
  achievements: ITalentAchievement[];
  avatar?: string;
  biography?: string;
  country?: ICountry;
  description?: string;
  dob?: string;
  footnotes: ITalentFootnote[];
  nickname: string;
  name?: string;
  roles: string[];
  slug: string;
  socialLinks: ITalentSocial[];
  status: number;
  totalEarnings?: string;
}
