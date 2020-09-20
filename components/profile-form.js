import { Controller, useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Box,
  Text,
  Icon,
  Stack,
} from "@chakra-ui/core";
import { DatePicker } from "components/datepicker";
import { useRouter } from "next/router";
import { subYears } from "date-fns";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useStore } from "tree";

export const ProfileForm = ({ profile }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState();
  const {
    profile: {
      store: { addProfile, setProfile },
    },
  } = useStore();

  const {
    control,
    register,
    handleSubmit,
    watch,
    errors,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const onChange = () => {
    clearErrors("apiErrorMessage");
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);
    let res;

    if (profile) {
      res = await setProfile({ ...formData, _id: profile._id });
    } else {
      res = await addProfile(formData);
    }

    if (res.status === "error") {
      setIsLoading(false);
      setError("apiErrorMessage", { type: "manual", message: res.message });
    } else {
      router.push("/profiles");
    }
  };

  return (
    <form onChange={onChange} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired m={5}>
        <FormLabel htmlFor="firstname">First name</FormLabel>
        <Input
          name="firstname"
          placeholder="First name"
          ref={register({ required: true })}
          defaultValue={(profile && profile.firstname) || ""}
        />
        <ErrorMessage
          errors={errors}
          name="firstname"
          message="This field is required"
        />
      </FormControl>

      <FormControl isRequired m={5} mt={0}>
        <FormLabel htmlFor="lastname">Last name</FormLabel>
        <Input
          name="lastname"
          placeholder="Last name"
          ref={register({ required: true })}
          defaultValue={(profile && profile.lastname) || ""}
        />
        <ErrorMessage
          errors={errors}
          name="lastname"
          message="This field is required"
        />
      </FormControl>

      <FormControl isRequired m={5} mt={0}>
        <FormLabel htmlFor="birthdate">Birth date</FormLabel>
        <Controller
          name="birthdate"
          control={control}
          defaultValue={(profile && profile.birthdate) || ""}
          rules={{ required: true }}
          render={(props) => (
            <DatePicker
              minDate={subYears(new Date(), 11)}
              maxDate={subYears(new Date(), 1)}
              {...props}
            />
          )}
        />
        <ErrorMessage
          errors={errors}
          name="birthdate"
          message="This field is required"
        />
      </FormControl>

      <ErrorMessage
        errors={errors}
        name="apiErrorMessage"
        render={({ message }) => (
          <Stack isInline p={5} mb={5} shadow="md" color="red.500">
            <Icon name="warning" size={5} />
            <Box>
              <Text>{message}</Text>
            </Box>
          </Stack>
        )}
      />

      <Button
        type="submit"
        isLoading={isLoading}
        isDisabled={Object.keys(errors).length > 0}
      >
        {profile ? "Edit" : "Add"}
      </Button>
    </form>
  );
};
