<script setup lang="ts">
import ModalBase from "./ModalBase.vue";

defineEmits(["close-modal"]);
</script>

<template>
    <ModalBase
        box-style="flex flex-col border-2 border-main-blue p-8 lg:p-16 drop-shadow-xl w-4/5 lg:w-3/5 h-4/5 gap-y-4 overflow-auto"
        @outside-click="$emit('close-modal')"
    >
        <h2>Terms and conditions</h2>
        <p>Please read these terms and conditions carefully before using our services.</p>
        <h3>1. Acceptance of Terms</h3>
        <p>
            By accessing or using our services, you agree to be bound by these terms and conditions.
            If you do not agree to these terms, please refrain from using our services.
        </p>
        <h3>2. Service Description</h3>
        <p>
            Our services allow users to request and manage funds transfers to and from their
            accounts. We strive to provide accurate and reliable information but cannot guarantee
            the availability or accuracy of the services at all times.
        </p>
        <h3>3. User Responsibilities</h3>
        <p>
            You are responsible for maintaining the confidentiality of your account information and
            ensuring that all activities conducted through your account comply with applicable laws
            and regulations.
        </p>
        <h3>4. Requesting Funds</h3>
        <p>
            When requesting funds, you must provide accurate and up-to-date information. Any false
            or misleading information may result in the rejection of your request.
        </p>
        <h3>5. Verification Process</h3>
        <p>
            Our administrative team will verify all fund transfer requests. We reserve the right to
            request additional documentation or information to verify the legitimacy of the request.
        </p>
        <h3>6. Notification</h3>
        <p>
            We will make reasonable efforts to notify you promptly regarding the status of your fund
            transfer request. However, we cannot be held liable for any delays or failures in
            notification.
        </p>
        <h3>7. Limitation of Liability</h3>
        <p>
            We shall not be held liable for any direct, indirect, incidental, or consequential
            damages arising out of or in connection with the use of our services or any errors or
            delays in fund transfers.
        </p>
        <h3>8. Modification of Terms</h3>
        <p>
            We reserve the right to modify or update these terms and conditions at any time without
            prior notice. It is your responsibility to review the terms periodically for any
            changes.
        </p>
        <h3>9. Governing Law</h3>
        <p>
            These terms and conditions shall be governed by and construed in accordance with the
            laws. Any disputes arising from the use of our services shall be subject to the
            exclusive jurisdiction of the courts. By using our services, you acknowledge that you
            have read, understood, and agreed to these terms and conditions.
        </p>
        <p>
            By using our services, you acknowledge that you have read, understood, and agreed to
            these terms and conditions.
        </p>
        <button class="normal-button bg-main-blue" @click="$emit('close-modal')">Close</button>
    </ModalBase>
</template>
