import IndustrialPage from '../../../components/IndustrialPage';
import { industrialByPath } from '../../../data/industrial';
import { pageMetadata } from '../../../data/seo';
const path = '/catalog/traversy/dlya-trub';
const page = industrialByPath(path);
export const metadata = pageMetadata(page.title + ' в Москве и МО', page.intro, path);
export default function Page(){ return <IndustrialPage path={path}/>; }
