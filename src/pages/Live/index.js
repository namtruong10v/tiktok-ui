import { useTranslation } from "react-i18next";

function Live() {
    const { t } = useTranslation('common')
    return (
        <div>
            <h2>{t('page_live.doingUpdate')}</h2>
        </div>

    );
}

export default Live;