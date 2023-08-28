import {merge} from 'lodash';
import ReactConfig from 'react-native-config';
import {Config, REQUIRED_NUMBER, REQUIRED_STRING} from '../definitions';

const env_config: Config = {
  code_push_key_android: ReactConfig.code_push_key_android || '',
  code_push_key_ios:
    ReactConfig.code_push_key_ios || 'X8jwNM_IWKjtBYpfVGYWIM_MajjtwmL73mUTQ',
  api_url: ReactConfig.api_url || '',
};
const loadConfig = () => {
  const configs = merge(new Config(), env_config);

  const verifyConfig = (obj: any, configPath?: string) => {
    for (const key in obj) {
      if (obj[key] instanceof Object) {
        verifyConfig(obj[key], `${configPath || 'configs'}.${key}`);
      } else if (obj[key] === REQUIRED_STRING || obj[key] === REQUIRED_NUMBER) {
        throw new Error(
          `Configuration for key "${
            configPath || 'configs'
          }.${key}" is missing`,
        );
      }
    }
  };
  verifyConfig(configs);
  return configs;
};

export const config = loadConfig();
