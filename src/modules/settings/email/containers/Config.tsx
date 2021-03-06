import gql from 'graphql-tag';
import { colors } from 'modules/common/styles';
import { Alert, withProps } from 'modules/common/utils';
import { mutations as brandMutations } from 'modules/settings/brands/graphql';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import {
  BrandDetailQueryResponse,
  BrandsConfigEmailMutationResponse
} from '../../brands/types';
import { Config } from '../components';

const defaultTemplate = `<p>Dear {{fullName}},</p>
<p>You received following messages at <strong>{{brandName}}</strong>:</p>
<ul class="messages">
  {{#each messages}}
    <li><span>{{content}}</span></li>
  {{/each}}
</ul>
<p><a href="{domain}">See all messages on <strong>{{domain}}</strong></a></p>
<footer>Powered by <a href="https://crm.nmma.co/" target="_blank">Erxes</a>.</footer>

<style type="text/css">
    .erxes-mail {
        font-family: Arial;
        font-size: 13px;
    }
    .messages {
        background: #eee;
        list-style: none;
        padding: 20px;
        margin-bottom: 20px;
    }
    .messages li {
        margin-bottom: 10px;
    }
    .messages li:last-child {
        margin-bottom: 0;
    }
    .messages li span {
        display: inline-block;
        background-color: #482b82;
        padding: 12px 16px;
        border-radius: 5px;
        color: #fff;
    }
    footer {
        border-top: 1px solid ${colors.borderDarker};
        margin-top: 40px;
        padding-top: 10px;
        font-weight: bold;
    }
</style>`;

type Props = {
  refetch: () => void;
  closeModal: () => void;
  brandId: string;
};

type FinalProps = {
  brandDetailQuery: BrandDetailQueryResponse;
} & Props &
  BrandsConfigEmailMutationResponse;

const ConfigContainer = (props: FinalProps) => {
  const { brandDetailQuery, configEmailMutation, refetch } = props;

  if (brandDetailQuery.loading) {
    return null;
  }

  const configEmail = (doc, callback) => {
    configEmailMutation({
      variables: doc
    })
      .then(() => {
        Alert.success('You successfully updated an email appearance.');
        refetch();
        callback();
      })
      .catch(error => {
        Alert.error(error.message);
      });
  };

  const updatedProps = {
    ...props,
    brand: brandDetailQuery.brandDetail,
    configEmail,
    defaultTemplate
  };

  return <Config {...updatedProps} />;
};

export default withProps<Props>(
  compose(
    graphql<Props, BrandDetailQueryResponse, { brandId: string }>(
      gql`
        query brandDetail($brandId: String!) {
          brandDetail(_id: $brandId) {
            _id
            name
            emailConfig
          }
        }
      `,
      {
        name: 'brandDetailQuery',
        options: ({ brandId }: { brandId: string }) => {
          return {
            variables: {
              brandId
            }
          };
        }
      }
    ),

    graphql(gql(brandMutations.brandsConfigEmail), {
      name: 'configEmailMutation'
    })
  )(ConfigContainer)
);
