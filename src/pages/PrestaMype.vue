<script setup lang="ts">

</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700">

        <div class="text-center text-white py-12 px-6 lg:hidden">
            <h1 class="text-4xl font-bold mb-4 leading-tight">
                El mejor<br>
                tipo de cambio
            </h1>
            <p class="text-lg opacity-90">
                para cambiar dólares y soles<br>
                online en Perú
            </p>
        </div>


        <div class="hidden lg:flex items-center justify-center min-h-screen p-8">
            <div class="container mx-auto flex items-center justify-between max-w-6xl">

                <div class="text-white max-w-lg">
                    <h1 class="text-5xl font-bold mb-4 leading-tight">
                        El mejor<br>
                        tipo de cambio
                    </h1>
                    <p class="text-xl opacity-90">
                        para cambiar dólares y soles<br>
                        online en Perú
                    </p>
                </div>

                <div class="ml-16">
                    <CurrencyConverter />
                </div>

            </div>
        </div>



    </div>
</template>

<style scoped></style>
