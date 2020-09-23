import { useState } from "react";
import { isStateTreeNode } from "mobx-state-tree";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/router";
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
import { subYears } from "date-fns";
import { useStore } from "tree";

export const ProfileForm = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState();
  const { profileType } = useStore();

  if (props.profile && !isStateTreeNode(props.profile)) {
    console.error("props.profile must be a model instance");
    return null;
  }

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
    const handleError = () => {
      setIsLoading(false);
      setError("apiErrorMessage", { type: "manual", message: res.message });
    };

    setIsLoading(true);
    let res;

    if (props.profile) {
      props.profile.merge(formData);
      res = await props.profile.update();
      if (res.status === "error") handleError();
      else
        router.push("/profiles/[...slug]", `/profiles/${props.profile.slug}`);
    } else {
      res = await profileType.store.postProfile(formData);
      if (res.status === "error") handleError();
      else router.push("/profiles");
    }
  };

  return (
    <form onChange={onChange} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired m={5} mt={0}>
        <FormLabel htmlFor="firstname">Prénom</FormLabel>
        <Input
          name="firstname"
          placeholder="Prénom"
          ref={register({ required: true })}
          defaultValue={(props.profile && props.profile.firstname) || ""}
        />
        <ErrorMessage
          errors={errors}
          name="firstname"
          message="Veuillez saisir un prénom"
        />
      </FormControl>

      <FormControl isRequired m={5} mt={0}>
        <FormLabel htmlFor="lastname">Nom</FormLabel>
        <Input
          name="lastname"
          placeholder="Nom"
          ref={register({ required: true })}
          defaultValue={(props.profile && props.profile.lastname) || ""}
        />
        <ErrorMessage
          errors={errors}
          name="lastname"
          message="Veuillez saisir un nom de famille"
        />
      </FormControl>

      <FormControl isRequired m={5} mt={0}>
        <FormLabel htmlFor="birthdate">Date de naissance</FormLabel>
        <Controller
          name="birthdate"
          control={control}
          defaultValue={(props.profile && props.profile.birthdate) || ""}
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
          message="Veuillez saisir une date de naissance"
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
        {props.profile ? "Modifier" : "Ajouter"}
      </Button>
    </form>
  );
};
