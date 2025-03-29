import PokrovaFeaturesList from '../PokrovaFeaturesList/PokrovaFeaturesList';
import PokrovaTitleWrapper from '../PokrovaTitleWrapper/PokrovaTitleWrapper';
import css from './PokrovaWrapper.module.css';

export default function PokrovaWrapper() {
    return <>
        <div className={css.container}>
            <PokrovaTitleWrapper />
            <PokrovaFeaturesList />
            <p className={css.text}>
                Свято, яке стало традицією. Покрова щороку збирає в Холодному Яру кращих синів і дочок України. Там ми вшановуємо заслуги героїв, що поклали свої життя для України.
            </p>
        </div>
    </>
}