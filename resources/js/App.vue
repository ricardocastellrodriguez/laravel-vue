<template>
    <div>
        <nav>
            <RouterLink to="/">
                Inicio
            </RouterLink>

            |

            <RouterLink to="/tareas">
                Tareas
            </RouterLink>
        </nav>

        <hr>

        <RouterView />
    </div>
</template>