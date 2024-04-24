import { resolvePlutusScriptAddress } from '@meshsdk/core';
import type { PlutusScript } from '@meshsdk/core';

const script: PlutusScript = {
  code: '4e4d01000033222220051200120011',
  version: 'V1',
};
const scriptAddr = resolvePlutusScriptAddress(script, 0);