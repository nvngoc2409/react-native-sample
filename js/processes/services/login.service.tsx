import axios from "axios";
import { AuthModel } from "../../models";


export class LoginService {
  async login(data: AuthModel) {
    return axios.post('login', data);
  }
}

export const loginService = new LoginService();
