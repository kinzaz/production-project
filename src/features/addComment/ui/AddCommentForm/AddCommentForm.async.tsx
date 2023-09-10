import { FC, lazy } from 'react';
import { AddCommentPageProps } from './index';

export const AddCommentFormAsync = lazy<FC<AddCommentPageProps>>(
    () => import('./index'),
);
