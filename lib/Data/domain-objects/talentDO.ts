import { IDomainObject, ITalent, ITalentDTO } from '@/typings';
import useStore from '@/stores';

export class TalentDO implements IDomainObject<ITalent, ITalentDTO> {
  private _talent: ITalent = {} as ITalent;

  private constructor(_talent: ITalent) {
    this._talent = _talent;
  }

  get = () => this._talent;

  set = (payload: Partial<ITalent>) => {
    this._talent = {
      ...this._talent,
      ...payload,
    };
  };

  static fromDTO = (talentDTO: ITalentDTO) => {
    const countries = useStore.getState().countries;

    const Talent: ITalent = {
      id: talentDTO.id,
      achievements: (talentDTO.talent_achievements ?? []).map(
        ({ id, name, talent_id, date, prize }) => ({
          id,
          date,
          name,
          prize,
          talentId: talent_id,
        }),
      ),
      avatar: talentDTO.image_fullpath,
      biography: talentDTO.biography,
      country: countries.find(({ id }) => id === talentDTO.country_id),
      description: talentDTO.description,
      dob: talentDTO.dob,
      footnotes: (talentDTO.talent_footnotes ?? []).map(
        ({ id, talent_id, description, title, url }) => ({
          id,
          description,
          talentId: talent_id,
          title,
          url,
        }),
      ),
      name: talentDTO.name,
      nickname: talentDTO.nickname,
      roles: [talentDTO.role ?? ''] ?? [],
      slug: talentDTO.slug,
      socialLinks: (talentDTO.talent_social_links ?? []).map(
        ({ id, talent_id, social_id, url, type }) => ({
          id,
          socialId: social_id,
          type,
          talentId: talent_id,
          url,
        }),
      ),
      status: talentDTO.status,
      totalEarnings: talentDTO.total_earnings,
    };

    return new TalentDO(Talent);
  };
}
