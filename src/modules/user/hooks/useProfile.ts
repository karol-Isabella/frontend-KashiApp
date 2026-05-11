/*
Profile Component hook
*/

import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { UserProfile } from '../domain/user.model';
import { mapUserProfileFromApi } from '../services/userMapper';

export const useProfile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [DeleteMessage, setDeleteMessage] = useState<boolean>(false);

    //UseEffect para cargar el perfil del usuario al montar el componente
    useEffect (() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const userProfileDto = await userService.getUserProfile();
                //se pasa al mapper para convertir los datos del backend
                setProfile(mapUserProfileFromApi(userProfileDto));
                setError(null);
            } catch (error) {
                setError('Failed to fetch user profile');
                console.error('failed')
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    //Bloquear el perfil del usuario y actualizar el estado de cuenta a BLOCKED
    const blockProfile = async () => {
        try {
            await userService.blockUserProfile();
            //Actualiza el estado sin renderizar todo el perfil
            setProfile(prevProfile => prevProfile ? { ...prevProfile, accountStatus: 'BLOCKED' } : null);
            setError(null);
        } catch (error) {
            setError('Failed to block user profile');
            console.error("Detalles del error", error)
        }
    };

    //Eliminar el perfil del usuario 
    const deleteProfile = async (password: string) => {
        try {
            await userService.deleteUserProfile(password);
            setProfile(prevProfile => prevProfile ? { ...prevProfile, accountStatus: 'DELETED' } : null);
            setDeleteMessage(false);
            setError(null);
        } catch (error) {
            setError('Failed to delete user')
            console.error("Error details", error)
        }
    }

    //Retornar el perfil, estado de carga/error y la funcion para bloquear (null o el perfil actualizado)
    return { profile, loading, error, blockProfile, deleteProfile, DeleteMessage, setDeleteMessage };

};

