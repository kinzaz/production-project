import { memo } from 'react';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProfilePageHeader } from './ProfilePageHeader';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack/VStack';
import { useParams } from 'react-router-dom';
import { EditableProfileCard } from 'features/editableProfileCard';
import { profileReducer } from 'features/editableProfileCard/model/slice/ProfileSlice';

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage = memo(() => {
  const { id } = useParams<{ id: string }>();

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page>
        <VStack gap="16">
          <ProfilePageHeader />
          {id && <EditableProfileCard id={id} />}
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
});

export default ProfilePage;
