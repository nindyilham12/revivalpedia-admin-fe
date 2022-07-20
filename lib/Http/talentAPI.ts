import { ITalent, ITalentDTO } from '@/typings';
import { TalentDO } from '../Data/domain-objects';
import { axiosClient } from './axiosClient';

export interface ISearchTalentParams {
  page?: number;
  perpage?: number;
  roles?: string;
  search?: string;
  status?: string;
}

export interface ISearchTalentResults {
  meta: {
    total?: string;
    totalPage: number;
  };
  data: ITalent[];
}

export const searchTalents = async (params: ISearchTalentParams): Promise<ISearchTalentResults> => {
  const defaultParams: Partial<ISearchTalentParams> = {
    perpage: 12,
    page: 1,
  };

  try {
    const res = await axiosClient.get('https://pedia-v2.rsrgnc.dev/api/talent', {
      params: { ...defaultParams, ...params },
    });

    const { data, meta } = res.data;

    const talents = data.map((talentDTO: ITalentDTO) => {
      const talentDO = TalentDO.fromDTO(talentDTO);
      return talentDO.get();
    });

    return {
      meta: {
        total: meta.total,
        totalPage: meta.total_page,
      },
      data: talents,
    };
  } catch (error) {
    return {
      meta: {
        total: '1',
        totalPage: 1,
      },
      data: [],
    };
  }
};
