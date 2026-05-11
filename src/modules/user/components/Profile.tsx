import React, { useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { Button } from "../../../globals/components/Button";
import { Input } from "../../../globals/components/Input";
import styles from "../styles/profile.module.css";

export const Profile: React.FC = () => {
    const { profile, loading, error, blockProfile, deleteProfile, DeleteMessage, setDeleteMessage } = useProfile();
    const [password, setPassword] = useState<string>('');

    if (loading) {
        return (
            <div className={styles.statusContainer}>
                <p className={styles.statusText}>Cargando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.statusContainer}>
                <p className={styles.errorText}>Error: {error}</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className={styles.statusContainer}>
                <p className={styles.statusText}>Perfil no disponible.</p>
            </div>
        );
    }

    const handleDeleteConfirmation = async () => {
        await deleteProfile(password);
        setPassword('');
    };

    const getStatusClass = () => {
        if (profile.accountStatus === 'BLOCKED') return styles.statusBlocked;
        if (profile.accountStatus === 'DELETED') return styles.statusDeleted;
        return styles.statusActive;
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>Perfil de usuario</h1>

                <div className={styles.infoSection}>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Usuario</span>
                        <span className={styles.infoValue}>{profile.username}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Email</span>
                        <span className={styles.infoValue}>{profile.email}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Teléfono</span>
                        <span className={styles.infoValue}>{profile.numberPhone}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Estado</span>
                        <span className={`${styles.statusBadge} ${getStatusClass()}`}>
                            {profile.accountStatus}
                        </span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Miembro desde</span>
                        <span className={styles.infoValue}>
                            {new Date(profile.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <div className={styles.actionsSection}>
                    <Button
                        variant="secondary"
                        onClick={blockProfile}
                        disabled={profile.accountStatus === 'BLOCKED' || profile.accountStatus === 'DELETED'}
                    >
                        {profile.accountStatus === 'BLOCKED' ? 'Perfil Bloqueado' : 'Bloquear Perfil'}
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => setDeleteMessage(true)}
                        disabled={profile.accountStatus === 'DELETED'}
                    >
                        {profile.accountStatus === 'DELETED' ? 'Perfil Eliminado' : 'Eliminar Perfil'}
                    </Button>
                </div>

                {DeleteMessage && (
                    <div className={styles.deleteConfirm}>
                        <p className={styles.deleteWarningText}>
                            ¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.
                        </p>
                        <Input
                            type="password"
                            label="Contraseña"
                            placeholder="Ingresa tu contraseña para confirmar"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className={styles.deleteActions}>
                            <Button variant="danger" onClick={handleDeleteConfirmation}>
                                Confirmar Eliminación
                            </Button>
                            <Button variant="secondary" onClick={() => setDeleteMessage(false)}>
                                Cancelar
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
