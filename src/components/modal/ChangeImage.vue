<script setup lang="ts">
import axios from "axios";
import { ref, watch, onMounted, onUnmounted } from "vue";
import FileDropZone from "../form/FileDropZone.vue";
import { useToast } from "vue-toastification";
import { useAccountStore } from "../../store/account";

const toast = useToast();
const store = useAccountStore();

const props = defineProps<{
    id: number;
    image_path: string;
}>();

const emit = defineEmits(["showModal"]);

onMounted(() => {
    document.body.style.overflow = "hidden";
});

onUnmounted(() => {
    document.body.style.overflow = "visible";
});

const changeImage = () => {
    // Refactor old file name
    const oldPath = props.image_path;
    const index = oldPath.lastIndexOf("/images/");
    if (index !== -1) {
        const old_image_name = oldPath.substring(index + "/images/".length);
        const data = new FormData();
        data.append("id", props.id.toString());
        data.append("old_name", old_image_name);
        data.append("new_image", files.value![0] as Blob, files.value![0].name);
        axios
            .put("http://localhost:8080/change-image", data, {
                withCredentials: true,
            })
            .then((response) => {
                toast.success(response.data.message);
                store.image_path = response.data.image;
                emit("showModal", false);
            })
            .catch((err) => {
                toast.error(err.response.data.error);
            });
    }
};

const files = ref<FileList>();
const uploaded = ref(false);

watch(files, () => {
    (document.getElementById("preview-image") as HTMLImageElement).src =
        URL.createObjectURL(files.value![0]);
    uploaded.value = true;
});
</script>

<template>
    <div
        class="fixed flex z-[5] justify-center items-center w-full h-screen bg-black/50"
        @click="$emit('showModal', false)"
    >
        <div
            class="flex flex-col rounded-md bg-white items-center justify-center p-4"
            @click.stop
        >
            <FileDropZone
                @files-dropped="(list: FileList) => files = list"
                #default="{ dropZoneActive }"
                class="flex flex-col items-center justify-center gap-y-4"
            >
                <div class="flex items-center justify-center gap-x-8">
                    <label for="file-input">
                        <div
                            v-if="dropZoneActive"
                            class="flex flex-col items-center justify-center rounded-xl border-2 border-main-green border-dashed w-[32rem] h-64"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-16 h-16 animate-bounce"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <h5 class="text-lg font-bold">Drop to add</h5>
                        </div>
                        <div
                            v-else
                            class="flex flex-col items-center justify-center rounded-xl border-2 border-black border-dashed w-[32rem] h-64"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-16 h-16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                                    clip-rule="evenodd"
                                />
                            </svg>

                            <h5 class="text-lg font-bold">
                                Drag your new image here or click to browse
                            </h5>
                            <p>Supports image files only (JPG, PNG, etc)</p>
                        </div>
                        <input
                            type="file"
                            id="file-input"
                            hidden
                            accept="image/*"
                            @change="files = $event.target.files"
                        />
                    </label>
                    <div
                        :class="
                            uploaded
                                ? `flex flex-col items-center justify-center`
                                : `hidden`
                        "
                    >
                        <h1 class="text-3xl font-extrabold uppercase">
                            Image Preview
                        </h1>
                        <img id="preview-image" class="max-w-60 max-h-48" />
                    </div>
                </div>
                <button
                    class="normal-button bg-main-green border-main-green hover:scale-[1.02] w-full"
                    v-if="uploaded"
                    @click="changeImage"
                >
                    Upload
                </button>
            </FileDropZone>
        </div>
    </div>
</template>
