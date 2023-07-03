<script setup lang="ts">
import { ref, onMounted, toRefs, watch } from "vue";
import { EditProfileReq } from "../../types/profile.type";
import TextInput from "../form/TextInput.vue";
import MultiSelectInput from "../form/MultiSelectInput.vue";
import { useAuthStore } from "../../store/auth.store";
import { useProfileStore } from "../../store/profile.store";
import { useAddressStore } from "../../store/address.store";
import { storeToRefs } from "pinia";

const props = defineProps({
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const { addressLine1, addressLine2, city, state, postalCode, country } = toRefs(props);

const editAddress = ref(false);
const form = ref({} as EditProfileReq);
const labels = ref([
    {
        label: "Address line 1",
        data: addressLine1
    },
    {
        label: "Address line 2",
        data: addressLine2
    },
    {
        label: "State",
        data: state
    },
    {
        label: "City",
        data: city
    },
    {
        label: "Postal code",
        data: postalCode
    },
    {
        label: "Country",
        data: country
    }
]);

const authStore = useAuthStore();
const profileStore = useProfileStore();
const addressStore = useAddressStore();

const { account } = storeToRefs(authStore);

addressStore.getProvinces();
const { provinces, isLoadingProvinces, regencies, isLoadingRegencies } = storeToRefs(addressStore);

const selectProvince = (event: Event) => {
    const selected = event.target as HTMLSelectElement;
    addressStore.getRegencies(selected.value);
    form.value.state = selected.selectedOptions[0].innerText;
};

const selectRegency = (event: Event) => {
    const selected = event.target as HTMLSelectElement;
    form.value.city = selected.value;
};

const updateProfile = () => {
    const formData = new FormData();
    formData.append("address_line_1", form.value.address_line_1);
    formData.append("address_line_2", form.value.address_line_2);
    formData.append("city", form.value.city);
    formData.append("state", form.value.state);
    formData.append("postal_code", form.value.postal_code);
    formData.append("country", form.value.country);
    profileStore.editProfile(account.value.id, formData);
    editAddress.value = false;
};

onMounted(() => {
    form.value.address_line_1 = props.addressLine1;
    form.value.address_line_2 = props.addressLine2;
    form.value.city = props.city;
    form.value.state = props.state;
    form.value.postal_code = props.postalCode;
    form.value.country = props.country;
});

watch(provinces, () => {
    const stateData = provinces.value.find((item) => item.name === form.value.state);
    if (stateData) {
        addressStore.getRegencies(stateData.id);
    }
});
</script>

<template>
    <div
        class="flex flex-col justify-center w-full lg:w-1/2 px-8 py-4 border border-black shadow-xl h-full lg:h-80"
        :class="editAddress ? `gap-y-2` : `gap-y-4`"
    >
        <div class="flex justify-between items-center">
            <h3>Address information</h3>
            <svg
                v-if="!editAddress"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-8 h-8 opacity-50 hover:opacity-100 cursor-pointer"
                @click="editAddress = true"
            >
                <path
                    d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
                />
            </svg>
            <div v-if="editAddress" class="flex items-center gap-x-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-8 h-8 cursor-pointer hover:scale-[1.2]"
                    @click="updateProfile"
                >
                    <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clip-rule="evenodd"
                    />
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-8 h-8 cursor-pointer hover:scale-[1.2]"
                    @click="editAddress = false"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>
        </div>
        <div
            v-if="!editAddress"
            class="grid grid-rows-6 grid-cols-1 lg:grid-rows-3 lg:grid-cols-2 items-center justify-center gap-4"
        >
            <div class="flex flex-col" v-for="component in labels" :key="component.label">
                <h4>{{ component.label }}</h4>
                <p v-if="component.label === `Address line 2`">
                    {{ component.data || "Not listed" }}
                </p>
                <p v-else>{{ component.data }}</p>
            </div>
        </div>
        <div
            v-else
            class="grid grid-rows-6 grid-cols-1 lg:grid-rows-3 lg:grid-cols-2 items-center justify-center gap-4"
        >
            <TextInput
                v-model="form.address_line_1"
                id="address_line1"
                label="Address line 1"
                placeholder="New address line 1"
                type="text"
            />
            <TextInput
                v-model="form.address_line_2"
                id="address_line2"
                label="Address line 2"
                placeholder="New address line 2"
                type="text"
            />
            <MultiSelectInput
                id="state"
                label="State"
                required
                :is-loading="isLoadingProvinces"
                @select-event="selectProvince"
            >
                <option
                    v-for="data in provinces"
                    :key="data.id"
                    :value="data.id"
                    :selected="data.name === form.state"
                >
                    {{ data.name }}
                </option>
            </MultiSelectInput>
            <MultiSelectInput
                id="city"
                label="City"
                required
                :is-loading="isLoadingRegencies"
                @select-event="selectRegency"
            >
                <option
                    v-for="data in regencies"
                    :key="data.id"
                    :value="data.name"
                    :selected="data.name === form.city"
                >
                    {{ data.name }}
                </option>
            </MultiSelectInput>
            <TextInput
                v-model="form.postal_code"
                id="postal_code"
                label="Postal code"
                placeholder="New postal code"
                type="text"
            />
            <TextInput
                v-model="form.country"
                id="country"
                label="Country"
                placeholder="New country"
                type="text"
            />
        </div>
    </div>
</template>
