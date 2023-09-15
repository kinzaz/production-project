import { FunctionComponent, ReactElement } from 'react';
import { FeatureFlags } from '../../../types/featureFlags';
import { getFeatureFlag } from '../setGetFeatures';

interface ToggleFeaturesProps {
    feature: keyof FeatureFlags;
    on: ReactElement;
    off: ReactElement;
}

export const ToggleFeatures: FunctionComponent<ToggleFeaturesProps> = ({
    feature,
    off,
    on,
}) => {
    if (getFeatureFlag(feature)) return on;

    return off;
};
