import { EntityIndexTemplate, SkeletonCard, TalentCard } from '@/components';
import { useDeleteEntityDialog } from '@/hooks';
import { getUserPermissions } from '@/lib/Utils/getPermissions';
import useStore from '@/stores';
import { ITalent } from '@/typings';
import { GridItem, SimpleGrid, VisuallyHidden } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export interface TalentIndexContentProps {
  isAppending: boolean;
  isLoading: boolean;
  talents: Pick<ITalent, 'id' | 'avatar' | 'name' | 'nickname' | 'roles' | 'slug' | 'status'>[];
  onScrollEnd?: () => void;
}

export const TalentIndexContent: FC<TalentIndexContentProps> = ({
  isAppending,
  isLoading,
  talents,
  onScrollEnd,
}) => {
  const user = useStore((state) => state.user);
  const { ref, inView } = useInView();
  const permission = getUserPermissions(user?.role);

  const onDeleteConfirm = (params: { slug: string } | null) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(params?.slug === 'adji-sven');
      }, 1000);
    });
  };

  const { DialogComponent, openDialog } = useDeleteEntityDialog<{ slug: string }>({
    failMessage: 'Gagal menghapus data talent',
    modalDescription: 'Ini tidak dapat dibatalkan dan akan dihapus dari halaman talent.',
    modalTitle: 'Hapus Talent?',
    onConfirm: onDeleteConfirm,
    successMessage: 'Data talent berhasil di hapus',
  });

  useEffect(() => {
    if (inView && !isLoading) {
      onScrollEnd?.();
    }
  }, [inView, isLoading, onScrollEnd]);

  return (
    <EntityIndexTemplate.Content>
      <>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={{ base: '20', lg: '16' }}>
          {isLoading ? (
            <SkeletonCard amount={4} as={GridItem} />
          ) : (
            talents.map((talent, i) => {
              return (
                <GridItem key={i.toString()}>
                  <TalentCard
                    talent={talent}
                    withDeleteAction={permission > 2}
                    onDelete={(slug: string) => openDialog({ slug })}
                  />
                </GridItem>
              );
            })
          )}
          {isAppending && <SkeletonCard amount={4} as={GridItem} />}
        </SimpleGrid>
        <VisuallyHidden ref={ref} />
        {DialogComponent}
      </>
    </EntityIndexTemplate.Content>
  );
};

TalentIndexContent.displayName = 'EntityIndexTemplateContent';
