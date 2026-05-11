import { apiClient } from "../../../services/apiClient";
import { ENDPOINTS } from "../../../services/endpoint";
import { UserProfile } from "../domain/user.model";


export interface UserResponseDTO {
    id: string;
    email:string;
    username: string;
    numberPhone: string;
    createdAt: string;
    accountStatus: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED' | 'DELETED' | 'BLOCKED';
}
export class UserService {
    //Funcion asincrona que espera a que se obtenga el perfil del usuario
    async getUserProfile(): Promise<UserResponseDTO> {
        const response = await apiClient.get<UserResponseDTO>(ENDPOINTS.USER.PROFILE, {});
        return response.data;
    }

    //Funcion asincrona que espera a que se bloquee el perfil
    async blockUserProfile(): Promise<void> {
        await apiClient.put(ENDPOINTS.USER.BLOCK_PROFILE);
    }

    async deleteUserProfile(password: string): Promise<void> {
        await apiClient.delete(ENDPOINTS.USER.DELETE_PROFILE, {password});
    }

}

//Exportamos una instancia de la clase UserService 
export const userService = new UserService();