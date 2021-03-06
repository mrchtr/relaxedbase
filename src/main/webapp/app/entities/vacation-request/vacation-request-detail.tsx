import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vacation-request.reducer';
import { IVacationRequest } from 'app/shared/model/vacation-request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVacationRequestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VacationRequestDetail = (props: IVacationRequestDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vacationRequestEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          VacationRequest [<b>{vacationRequestEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{vacationRequestEntity.status ? 'true' : 'false'}</dd>
          <dt>
            <span id="startDate">Start Date</span>
          </dt>
          <dd>
            {vacationRequestEntity.startDate ? (
              <TextFormat value={vacationRequestEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endDate">End Date</span>
          </dt>
          <dd>
            {vacationRequestEntity.endDate ? (
              <TextFormat value={vacationRequestEntity.endDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>Applicant</dt>
          <dd>{vacationRequestEntity.applicant ? vacationRequestEntity.applicant.id : ''}</dd>
          <dt>Stand In</dt>
          <dd>{vacationRequestEntity.standIn ? vacationRequestEntity.standIn.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/vacation-request" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vacation-request/${vacationRequestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vacationRequest }: IRootState) => ({
  vacationRequestEntity: vacationRequest.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VacationRequestDetail);
