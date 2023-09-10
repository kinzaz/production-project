import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';

const ArticleEditPage: FunctionComponent = () => {
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);

    return <Page>{isEdit ? 'edit' : 'create'}</Page>;
};

export default ArticleEditPage;
