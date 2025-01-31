import { Grid } from '@mantine/core';
import { GlossaryCategoriesData } from './glossaryCategoriesData';
import { GlossaryData } from './glossaryData';
import { GlossaryTermsData } from './glossaryTermsData';
import { useState } from 'react';
import { glossaries } from '@lfai/egeria-js-commons';

interface Props {
  columnMinWidth?: number;
  guid?: any;
}

export function EgeriaGlossary (props: Props) {
  const { columnMinWidth } = props;
  const [categories, setCategories] = useState([]);
  const [categoryIsLoading, setCategoryIsLoading] = useState(false);
  const [terms, setTerms] = useState([]);
  const [termIsLoading, setTermIsLoading] = useState(false);

  const handleGlossaryCategoriesApi = async (guid: string) => {
    const res = await glossaries.getGlossaryCategories(guid);

    if(res) {
      const data = await res.json();

      setCategories(data.map((d: any) => {
        return {
          displayName: d.displayName,
          status: d.status,
          guid: d.guid
        };
      }));
    }

    setCategoryIsLoading(false);
  };

  const handleGlossaryTermsApi = async (guid: string) => {
    const res = await glossaries.getGlossaryTerms(guid);

    if(res) {
      const data = await res.json();

      setTerms(data.map((d: any) => {
        return {
          displayName: d.displayName,
          status: d.status,
          guid: d.guid
        };
      }));
    }

    setTermIsLoading(false);
  };

  const onUserSelectGlossaryData = (data: any) => {
    setTerms([]);

    setCategoryIsLoading(true);

    handleGlossaryCategoriesApi(data.guid);
  };

  const onUserSelectCategoryData = (data: any) => {
    setTermIsLoading(true);

    handleGlossaryTermsApi(data.guid);
  };

  const onUserSelectTerms = (data: any) => {
    console.log('onUserSelectTerms', data);
  };

  return (
    <Grid grow gutter="xs" style={{height:'100%'}} className="egeria-glossary" >
      <Grid.Col span={4}>
        <GlossaryData columnMinWidth={columnMinWidth}
                      onUserSelect={(id: string) => onUserSelectGlossaryData(id)} />
      </Grid.Col>
      <Grid.Col span={4}>
        <GlossaryCategoriesData columnMinWidth={columnMinWidth}
                                data={categories}
                                isLoading={categoryIsLoading}
                                onUserSelect={(id: string) => onUserSelectCategoryData(id)} />
      </Grid.Col>
      <Grid.Col span={4}>
        <GlossaryTermsData columnMinWidth={columnMinWidth}
                           data={terms}
                           isLoading={termIsLoading}
                           onUserSelect={(id: string) => onUserSelectTerms(id)} />
      </Grid.Col>
    </Grid>
  );
}
