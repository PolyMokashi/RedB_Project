<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <validation-provider v-slot="{ errors }" name="Name" rules="required">
        <v-text-field
          v-model="username"
          :error-messages="errors"
          label="UserName"
          prepend-icon="mdi-account"
          outlined
          clearable
          required
        ></v-text-field>
      </validation-provider>
      <!-- <validation-provider
          v-slot="{ errors }"
          name="phoneNumber"
          :rules="{
            required: true,
            digits: 10,
            regex: '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$'
          }"
        >
          <v-text-field
            v-model="phoneNumber"
            :counter="10"
            :error-messages="errors"
            label="Mobile No."
            maxlength="10"
            outlined
            clearable
            required
          ></v-text-field>
        </validation-provider> -->
        <validation-provider
          v-slot="{ errors }"
          name="password"
          rules="required"
        >
      <v-text-field
        v-model="password"
        outlined
        clearable
        :error-messages="errors"
        prepend-icon="mdi-lock-outline"
        label="Password"
        type="password"
        required
      ></v-text-field>
    </validation-provider>
      <!-- <validation-provider
          v-slot="{ errors }"
          name="select"
          rules="required"
        >
          <v-select
            v-model="select"
            :items="items"
            :error-messages="errors"
            label="Select"
            data-vv-name="select"
            required
          ></v-select>
        </validation-provider> -->
      <!-- <validation-provider
          v-slot="{ errors }"
          rules="required"
          name="checkbox"
        >
          <v-checkbox
            v-model="checkbox"
            :error-messages="errors"
            value="1"
            label="Option"
            type="checkbox"
            required
          ></v-checkbox>
        </validation-provider> -->

      <v-btn
        class="mr-4"
        type="submit"
        dark
        color="black"
        :disabled="invalid"
        to="/Hospital"
        link
      >
        submit
      </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form>
  </validation-observer>
</template>

  <script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    username: "",
    phoneNumber: "",
    password:"",
    email: "",
    select: null,
    checkbox: null,
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.name = "";
      this.phoneNumber = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$refs.observer.reset();
    },
  },
};
</script>