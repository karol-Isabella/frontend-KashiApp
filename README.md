# KashiApp Frontend - Screaming Architecture
Este proyecto utiliza Screaming Architecture (Arquitectura que "grita" el negocio) bajo un enfoque modular y robusto. El objetivo es garantizar la Calidad de Software, facilitando el mantenimiento y la escalabilidad de nuestra billetera digital.

## Estructura del Proyecto
A diferencia de las arquitecturas tradicionales por capas técnicas, aquí el código se organiza por Módulos Funcionales. Al abrir la carpeta `src/modules`, la estructura nos dice qué hace la aplicación, no qué herramientas usa.

## Módulos del sistema
| Módulo | Responsabilidad Principal | Componente Clave (UI) | Hook de Lógica |
| :--- | :--- | :--- | :--- |
| **Auth** | Gestión de acceso, registro y persistencia de seguridad JWT. | `LoginForm.tsx` | `useAuth.ts` |
| **Wallet** | Visualización de saldo actual y estado financiero global. | `BalanceCard.tsx` | `useWallet.ts` |
| **Transaction** | Ejecución de transferencias y listado de movimientos. | `TransactionList.tsx` | `useTransaction.ts` |
| **User** | Gestión de perfil, datos de cuenta y preferencias de usuario. | `UserProfile.tsx` | `useUserUpdate.ts` |
| **Notification** | Alertas del sistema y avisos de transacciones recibidas. | `NotificationItem.tsx` | `useNotification.ts` |
| **Report** | Análisis visual de datos mediante gráficas y estadísticas. | `MonthlyChart.tsx` | `useReportData.ts` |
| **Admin** | Gestión de usuarios, bloqueos y auditoría del sistema. | `UserTable.tsx` | `useAdminActions.ts` |
| **Contact** | Agenda de beneficiarios para envíos rápidos de dinero. | `ContactList.tsx` | `useContact.ts` |

## Anatomía de un Módulo
Cada módulo es autosuficiente y contiene:

* `domain/`: El corazón del módulo. Contiene las interfaces de TypeScript y las reglas de negocio. Es independiente de React.

* `components/`: Componentes visuales específicos del módulo.

* `hooks/`: Lógica de estado y efectos de React.

* `services/`: Service.ts: Realiza las peticiones a la API (Spring Boot). Mapper.ts: Transforma los datos del Backend (DTOs) al formato del Frontend (Modelos).

* `styles/`: Archivos .module.css para evitar colisiones de estilos.

## Reglas para el Equipo
Para mantener la calidad de KashiApp, deben seguir estas pautas:

* ***Tipado Estricto***: Prohibido el uso de any. Toda entidad debe tener su interfaz en la carpeta domain.

* ***Mapeo Obligatorio***: Ninguna respuesta de la API debe llegar directamente al componente. Debe pasar por su respectivo Mapper para estandarizar los nombres de las variables (de snake_case a camelCase).

* ***Estilos Encapsulados***: Usar exclusivamente CSS Modules para asegurar que los efectos de un módulo no afecten a otros.

* ***Componentes Globales***: Si un componente se usa en más de dos módulos (ej: botones, inputs), debe moverse a src/globals/components.

### Flujo de Datos

* ***Domain***: Define las interfaces y modelos de datos.
* ***Service***: Realiza la petición HTTP a Spring Boot.
* ***Mapper***: Traduce el DTO del backend al Modelo del dominio.
* ***Hook***: Gestiona el estado y la lógica de la UI.
* ***Component***: Renderiza la información con los estilos definidos.

### Comandos Útiles
`npm install`: Instala las dependencias.

`npm run dev`: Inicia el servidor de desarrollo en http://localhost:5173.

`npm run build`: Genera el paquete de producción.
