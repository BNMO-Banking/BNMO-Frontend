<script setup lang="ts">
defineProps({
    cardNumber: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    }
});

const formatCardNumber = (card: string) => {
    return `
        ${card.substring(0, 4)} ${card.substring(4, 8)} 
        ${card.substring(8, 12)} ${card.substring(12, 16)}`;
};

const formatAccountNumber = (account: string) => {
    return `${account.substring(0, 3)} ${account.substring(3, 9)} ${account.substring(9, 10)}`;
};
</script>

<template>
    <div
        class="flex flex-col justify-center border border-black shadow-xl px-8 py-4 w-full xl:w-1/2 h-full xl:h-80 gap-y-2"
    >
        <h3>Your card</h3>
        <div
            class="flex self-center flex-col w-64 h-48 lg:w-80 xl:w-96 xl:h-60 bg-main-green rounded-xl"
        >
            <div class="flex justify-end pt-4 pb-2 px-4">
                <img src="/Logo.png" alt="Logo" class="w-16 xl:w-24" v-once />
            </div>
            <div class="w-full bg-black h-10"></div>
            <div class="flex flex-col p-4 gap-y-2">
                <p class="text-white text-base xl:text-xl tracking-widest drop-shadow-xl">
                    {{ formatCardNumber(cardNumber) }}
                </p>

                <p class="text-white text-sm xl:text-xl tracking-wide drop-shadow-xl">
                    {{ formatAccountNumber(accountNumber) }}
                </p>
                <p class="text-white text-sm xl:text-base drop-shadow-xl uppercase">
                    {{ fullName }}
                </p>
            </div>
        </div>
    </div>
</template>
