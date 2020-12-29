import {Store} from 'pullstate'

interface iConfig{
    apiUrl: string;
}

export const ConfigStore = new Store<iConfig>({
    apiUrl:"https://www.intermedicina.com.br/api/"
})