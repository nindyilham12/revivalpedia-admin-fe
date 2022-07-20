import { EntityIndexTemplate, TalentIndexContent, TalentIndexFilters } from '@/components';
import { useSearchEntity } from '@/hooks';
import { ISearchTalentParams, ISearchTalentResults, searchTalents } from '@/lib/Http';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const TalentIndexPage = () => {
  const [isAppending, setIsAppending] = useState(false);
  const [page, setPage] = useState(1);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
  const { state, updateQuery, updateResults } = useSearchEntity<
    ISearchTalentParams,
    ISearchTalentResults
  >({
    initialState: {
      isLoading: false,
      params: {},
      results: {
        data: [],
        meta: {
          totalPage: 1,
        },
      },
    },
    onQueryUpdate: searchTalents,
  });

  const onScrollEnd = async () => {
    if (isAppending) return;
    if (page > state.results.meta.totalPage) return;

    setIsAppending(true);

    const results = await searchTalents({ ...state.params, page });
    setPage((prev) => prev + 1);

    updateResults({
      ...state.results,
      data: [...state.results.data, ...results.data],
      meta: results.meta,
    });

    const _timeoutId = setTimeout(() => {
      setIsAppending(false);
    }, 500);

    setTimeoutId(_timeoutId);
  };

  useEffect(() => {
    if (state.isLoading) {
      setPage(2);
      setIsAppending(false);
      clearTimeout(timeoutId);
    }
  }, [state.isLoading, timeoutId]);

  return (
    <>
      <Head>
        <title>RevivalPedia | Talent</title>
      </Head>

      <EntityIndexTemplate
        title="Talent E-Sports"
        badgeText={state.results.meta.total}
        buttonText="Tambah Talent"
        buttonUrl="/talent/buat"
      >
        <TalentIndexFilters onChange={updateQuery} />
        <TalentIndexContent
          talents={state.results.data}
          isLoading={state.isLoading}
          onScrollEnd={onScrollEnd}
          isAppending={isAppending}
        />
      </EntityIndexTemplate>
    </>
  );
};

TalentIndexPage.title = 'Talent';

export default TalentIndexPage;
