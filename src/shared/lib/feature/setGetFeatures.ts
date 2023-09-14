import { FeatureFlags } from '@/shared/types/featureFlags';

// ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИИ, ИХ НЕОБЯЗАТЕЛЬНО ДЕЛАТЬ РЕАКТИВНЫМИ.
let featuresFlag: FeatureFlags;

export function setFeaturesFlags(newFeatureFlag?: FeatureFlags) {
    if (newFeatureFlag) {
        featuresFlag = newFeatureFlag;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featuresFlag[flag];
}
