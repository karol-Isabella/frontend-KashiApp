import { UserProfile } from "../domain/user.model";
import { UserResponseDTO } from "./userService";

//Mapea los datos del backend al modelo de perfil de usuario del frontend
export const mapUserProfileFromApi = (dto: UserResponseDTO): UserProfile => {
    return {
        id: dto.id,
        email: dto.email,
        username: dto.username,
        numberPhone: dto.numberPhone,
        createdAt: dto.createdAt,
        accountStatus: dto.accountStatus,
    };
};
