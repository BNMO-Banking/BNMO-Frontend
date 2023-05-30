<script setup lang="ts">
import axios from "axios";
import { onMounted, onUnmounted } from "vue";
import { useToast } from "vue-toastification";
const toast = useToast();
const props = defineProps<{
    id: number;
    type: string;
}>();

const emit = defineEmits(["showModal"]);

onMounted(() => {
    document.body.style.overflow = "hidden";
    console.log(props.type);
});

onUnmounted(() => {
    document.body.style.overflow = "visible";
});

const resetPIN = () => {
    console.log("reseting");
    const data = {
        id: props.id,
    };

    axios
        .put("http://localhost:8080/admin/reset-pin", data, {
            withCredentials: true,
        })
        .then((response) => {
            toast.success(response.data.message, {
                timeout: 5000,
            });
            emit("showModal", false);
        })
        .catch((err) => {
            toast.error(err.response.data.error, {
                timeout: 5000,
            });
        });
};

const deleteData = () => {
    console.log("deleteing");
    axios
        .delete(`http://localhost:8080/admin/delete-account?id=${props.id}`, {
            withCredentials: true,
        })
        .then((response) => {
            toast.success(response.data.message, {
                timeout: 5000,
            });
            emit("showModal", false);
        })
        .catch((err) => {
            console.log(err);
        });
};
</script>

<template>
    <div
        class="fixed flex z-[5] justify-center items-center w-full h-screen bg-black/50"
        @click="$emit('showModal', false)"
    >
        <div
            class="flex flex-col w-2/5 rounded-md bg-white p-8 gap-y-4"
            @click.stop
        >
            <h4 class="text-3xl font-bold uppercase text-center" v-once>
                Confirm {{ type }}
            </h4>
            <p class="text-lg text-center" v-if="type === `reset`">
                Are you sure you want to reset this user PIN?
            </p>
            <p class="text-lg text-center" v-if="type === `delete`">
                Are you sure you want to delete this user?
            </p>
            <div class="flex gap-x-4 w-full">
                <button
                    class="normal-button bg-main-green border-main-green w-full hover:scale-105"
                    @click="$emit('showModal', false)"
                >
                    Cancel
                </button>
                <button
                    v-if="type === `reset`"
                    class="normal-button bg-main-red border-main-red w-full hover:scale-105"
                    @click="resetPIN"
                >
                    Reset
                </button>
                <button
                    v-if="type === `delete`"
                    class="normal-button bg-main-red border-main-red w-full hover:scale-105"
                    @click="deleteData"
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>
