import React from 'react'
import useApi from '../../_hooks/useApi'
import { ILandingpageValues } from '../../_interfaces/ILandingpageValues'
import LandingPage from './LandingPage'
import apiConfig from '../../_config/apiConfig.json'
import useLocalStorage from '../../_hooks/useLocalStorage'
import { IButtlerConfiguration } from '../../_interfaces/IButtlerConfiguration'
import { LocalStorageKeyEnum } from '../../_enums/localStorageKeyEnum'

const LandingPageDataService: React.FC = () => {

    const localStorageService = useLocalStorage<IButtlerConfiguration>();

    const [buttlerConfig, setButtlerConfig] = React.useState<IButtlerConfiguration>(localStorageService.getItem(LocalStorageKeyEnum.buttlerConfiguration))
    
    const valuesUrlPrefix = React.useMemo(() =>{
        return `landingpage_landingpage${buttlerConfig.language?? 'En'}`
    },[buttlerConfig])

    const valueDataService = useApi<ILandingpageValues>({
        serviceUri: apiConfig.baseUrl + apiConfig.i18nController + valuesUrlPrefix, params: null})

    const setButtlerConfiguration = React.useCallback((config: IButtlerConfiguration) =>{
        localStorageService.setItem(LocalStorageKeyEnum.buttlerConfiguration, JSON.stringify(config))
        window.location.href = '/'
        setButtlerConfig(config)
        
    },[localStorageService, setButtlerConfig])

    if(valueDataService.items[0] === null || valueDataService.items[0] === undefined){
        return null
    }
    
    return(
        <LandingPage 
            values={valueDataService.items[0]}
            buttlerConfig={buttlerConfig}
            setButtlerConfiguration={setButtlerConfiguration}
            />
    )
}

export default LandingPageDataService