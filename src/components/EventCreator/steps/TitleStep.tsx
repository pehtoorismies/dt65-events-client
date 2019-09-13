import React, { FunctionComponent } from 'react';
// @ts-ignore
import BaseStep from './BaseStep';
import * as Yup from 'yup';
import { Box, Flex, Text } from 'rebass';
import { Formik, Field, FormikProps, Form, FormikActions } from 'formik';
import { RightArrowButton, LeftArrowButton, EventInput } from '../../Common';
import { IEventStep } from '../../../types';

interface IProps extends IEventStep {
  title?: string;
  subtitle?: string;
  setTitles: (title?: string, subtitle?: string) => void;
}

interface TitleFormValues {
  title?: string;
  subtitle?: string;
}

const HintText = (props: any) => (
  <Text {...props} fontSize={1} mb={1} fontFamily="monospace" />
);

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Vähintään 3 kirjainta')
    .max(30, 'Enintään 25 kirjainta')
    .required('Anna tapahtuman nimi'),
  subtitle: Yup.string()
    .min(3, 'Vähintään 3 kirjainta')
    .max(30, 'Enintään 25 kirjainta'),
});

const TitleStep: FunctionComponent<IProps> = (props: IProps) => {
  const { title, subtitle, setTitles, toPrevStep, toNextStep } = props;

  return (
    <BaseStep title="Anna tapahtumalle nimi">
      <Flex justifyContent="center" alignSelf="center">
        <Formik
          validationSchema={validationSchema}
          initialValues={{ title: title || '', subtitle: subtitle || '' }}
          onSubmit={(
            values: TitleFormValues,
            actions: FormikActions<TitleFormValues>
          ) => {
            setTitles(values.title, values.subtitle);
            actions.setSubmitting(false);
            toNextStep();
          }} // Do nothing
          render={(formikBag: FormikProps<TitleFormValues>) => {
            const { isValid } = formikBag;

            return (
              <Flex flexDirection="column" width="100%" p={2}>
                <Box
                  p={2}
                  bg="lightestgrey"
                  sx={{ border: '3px solid lightgrey', borderRadius: '4px' }}
                  width="70%"
                  alignSelf="center"
                >
                  <HintText>Esimerkki</HintText>
                  <Flex>
                    <HintText fontWeight="bold">Nimi:</HintText>
                    <HintText>Tempoajo </HintText>
                  </Flex>
                  <Flex>
                    <HintText fontWeight="bold">Tarkenne:</HintText>
                    <HintText>Seuran mestaruus </HintText>
                  </Flex>
                </Box>

                <Form>
                  <Box py={3}>
                    <Field
                      width="100%"
                      name="title"
                      placeholder="Tapahtuman nimi*"
                      component={EventInput}
                    />
                  </Box>
                  <Box py={3}>
                    <Field
                      width="100%"
                      name="subtitle"
                      placeholder="Mahdollinen tarkenne"
                      component={EventInput}
                    />
                  </Box>
                  <Flex
                    my={4}
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <LeftArrowButton onClick={toPrevStep} visible={true} />
                    <RightArrowButton type="submit" visible={isValid} />
                  </Flex>
                </Form>
              </Flex>
            );
          }}
        />
      </Flex>
    </BaseStep>
  );
};

export default TitleStep;
