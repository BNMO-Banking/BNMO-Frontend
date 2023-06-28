<script setup lang="ts"></script>

<template>
    <header class="flex flex-col bg-main-green justify-center items-center py-8 gap-y-4">
        <img src="/Logo.png" alt="Big Logo" class="w-96" />
        <h1 class="text-3xl font-extrabold">YOUR SOLUTION FOR MONEY</h1>
    </header>
    <section class="flex justify-between items-center bg-white py-8 px-16 gap-x-16">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-40 h-40"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
        </svg>
        <p class="w-3/4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla tincidunt
            lacus eu blandit. Nunc aliquam congue tortor eu rutrum. Pellentesque eget justo
            convallis, luctus erat vel, efficitur nisi. Integer nisl tellus, imperdiet imperdiet
            auctor vel, interdum vel elit. Nullam commodo pretium eleifend. Donec eget erat
            accumsan, condimentum ante et, feugiat odio. Quisque sit amet felis vel ligula
            vestibulum iaculis. Suspendisse posuere imperdiet dolor at sagittis. Vivamus rutrum quam
            dolor, et convallis metus vulputate sit amet. Mauris fringilla libero augue, eget
            rhoncus lacus facilisis non. Sed sed purus non ex efficitur pulvinar. Sed in nibh purus.
            Aenean sem tortor, luctus.
        </p>
    </section>
    <section class="flex justify-between items-center bg-main-green py-8 px-16 gap-x-16">
        <p class="w-3/4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla tincidunt
            lacus eu blandit. Nunc aliquam congue tortor eu rutrum. Pellentesque eget justo
            convallis, luctus erat vel, efficitur nisi. Integer nisl tellus, imperdiet imperdiet
            auctor vel, interdum vel elit. Nullam commodo pretium eleifend. Donec eget erat
            accumsan, condimentum ante et, feugiat odio. Quisque sit amet felis vel ligula
            vestibulum iaculis. Suspendisse posuere imperdiet dolor at sagittis. Vivamus rutrum quam
            dolor, et convallis metus vulputate sit amet. Mauris fringilla libero augue, eget
            rhoncus lacus facilisis non. Sed sed purus non ex efficitur pulvinar. Sed in nibh purus.
            Aenean sem tortor, luctus.
        </p>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-40 h-40"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
        </svg>
    </section>
    <section class="flex flex-col justify-center items-center bg-white py-8 px-16 gap-y-4">
        <p class="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at eros risus. Sed ac
            pretium lorem. Donec convallis quam eget eros mollis vehicula dignissim et sem. Sed
            lobortis neque quam, quis ultrices metus consequat quis. Nullam ullamcorper in ex eget
            eleifend. Donec at odio ac quam ullamcorper dapibus. Mauris quis lorem ut ligula auctor
            rhoncus. Maecenas quis efficitur leo. Etiam vel purus ligula. Integer odio nulla,
            maximus eget lorem eget, vehicula lobortis nulla. Curabitur id massa sagittis, aliquam
            sem ut, sodales lorem. Sed ullamcorper orci nec magna commodo, sed vestibulum quam
            volutpat. Sed eget est rutrum, viverra ipsum ac, placerat.
        </p>
        <RouterLink class="normal-button hover:bg-main-green hover:border-main-green" to="/register"
            >Get Started</RouterLink
        >
    </section>
</template>
