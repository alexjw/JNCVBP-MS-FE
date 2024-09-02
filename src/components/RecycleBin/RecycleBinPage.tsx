import React, { useEffect, useRef, useState } from "react";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import Select from "react-select";

import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GetCoursesDisabledQuery,
  GetEventsDisabledQuery,
  GetGuardsDisabledQuery,
  GetRanksDisabledQuery,
  GetServicesDisabledQuery,
  GetTrainingsDisabledQuery,
  GetUsersDisabledQuery,
  GetVolunteersDisabledQuery,
  RestoreCourseMutation,
  RestoreEventMutation,
  RestoreGuardMutation,
  RestoreRankMutation,
  RestoreServiceMutation,
  RestoreTrainingMutation,
  RestoreUserMutation,
  RestoreVolunteerMutation,
} from "../../types";
import { GET_COURSES, GET_COURSES_DISABLED, GET_PAGINATED_COURSES, RESTORE_COURSE } from "../../queries/Courses";
import {
  GET_PAGINATED_VOLUNTEERS,
  GET_VOLUNTEERS,
  GET_VOLUNTEERS_DISABLED,
  RESTORE_VOLUNTEER,
} from "../../queries/volunteers";
import { GET_DUTIES_DISABLED } from "../../queries/duties";
import { GET_EVENTS, GET_EVENTS_DISABLED, GET_PAGINATED_EVENTS, RESTORE_EVENT } from "../../queries/events";
import { CURRENT_GUARD, GET_PAGINATED_GUARDS, NEXT_GUARD, RESTORE_GUARD } from "../../queries/Guards";
import { GET_RANKS, GET_RANKS_DISABLED, RESTORE_RANK } from "../../queries/ranks";
import { GET_PAGINATED_SERVICES, GET_SERVICES, GET_SERVICES_DISABLED, RESTORE_SERVICE } from "../../queries/services";
import {
  GET_PAGINATED_TRAININGS,
  GET_TRAININGS,
  GET_TRAININGS_DISABLED,
  RESTORE_TRAINING,
} from "../../queries/Trainings";
import {
  get_course_columns,
  get_event_columns,
  get_guard_columns,
  get_service_columns,
  get_training_columns,
  get_users_columns,
  get_volunteer_columns,
} from "utils/columns";
import { GET_PAGINATED_USERS, GET_USERS, GET_USERS_DISABLED, RESTORE_USER } from "../../queries/Users";
import PagedTable from "../utils/PagedTable";
import { DocumentNode } from "graphql";

const COURSE = "Cursos";
const EVENT = "Eventos";
const GUARD = "Guardias";
const USERS = "Usuarios";
const RANK = "Rangos";
const SERVICE = "Servicios";
const TRAINING = "Prácticas";
const VOLUNTEER = "Voluntarios";

const OPTIONS = [
  { value: COURSE, label: COURSE },
  { value: EVENT, label: EVENT },
  { value: GUARD, label: GUARD },
  { value: USERS, label: USERS },
  { value: SERVICE, label: SERVICE },
  { value: TRAINING, label: TRAINING },
  { value: VOLUNTEER, label: VOLUNTEER },
];

const RecycleBinPage = (props) => {
  const [type, setType] = useState({ value: COURSE, label: COURSE });
  const [loadCourses, courses] = useLazyQuery<GetCoursesDisabledQuery>(GET_COURSES_DISABLED);
  const [restoreCourse, restoredCourse] = useMutation<RestoreCourseMutation>(RESTORE_COURSE, {
    refetchQueries: [{ query: GET_COURSES_DISABLED }, { query: GET_COURSES }],
  });
  const [restoreEvent, restoredEvent] = useMutation<RestoreEventMutation>(RESTORE_EVENT, {
    refetchQueries: [{ query: GET_EVENTS_DISABLED }, { query: GET_EVENTS }],
  });
  const [restoreGuard, restoredGuard] = useMutation<RestoreGuardMutation>(RESTORE_GUARD, {
    refetchQueries: [{ query: CURRENT_GUARD }, { query: NEXT_GUARD }],
  });
  const [restoreUser, restoredUser] = useMutation<RestoreUserMutation>(RESTORE_USER, {
    refetchQueries: [{ query: GET_USERS_DISABLED }, { query: GET_USERS }],
  });
  const [restoreRank, restoredRank] = useMutation<RestoreRankMutation>(RESTORE_RANK, {
    refetchQueries: [{ query: GET_RANKS_DISABLED }, { query: GET_RANKS }],
  });
  const [restoreService, restoredService] = useMutation<RestoreServiceMutation>(RESTORE_SERVICE, {
    refetchQueries: [{ query: GET_SERVICES_DISABLED }, { query: GET_SERVICES }],
  });
  const [restoreTraining, restoredTraining] = useMutation<RestoreTrainingMutation>(RESTORE_TRAINING, {
    refetchQueries: [{ query: GET_TRAININGS_DISABLED }, { query: GET_TRAININGS }],
  });
  const [restoreVolunteer, restoredVolunteer] = useMutation<RestoreVolunteerMutation>(RESTORE_VOLUNTEER, {
    refetchQueries: [{ query: GET_VOLUNTEERS }, { query: GET_PAGINATED_VOLUNTEERS }],
  });
  const [loadEvents, events] = useLazyQuery<GetEventsDisabledQuery>(GET_EVENTS_DISABLED);
  const [loadGuards, guards] = useLazyQuery<GetGuardsDisabledQuery>(GET_GUARDS_DISABLED);
  const [loadRanks, ranks] = useLazyQuery<GetRanksDisabledQuery>(GET_RANKS_DISABLED);
  const [loadServices, services] = useLazyQuery<GetServicesDisabledQuery>(GET_SERVICES_DISABLED);
  const [loadTrainings, trainings] = useLazyQuery<GetTrainingsDisabledQuery>(GET_TRAININGS_DISABLED);
  const [loadVolunteers, volunteers] = useLazyQuery<GetVolunteersDisabledQuery>(GET_VOLUNTEERS_DISABLED);
  const [loadUsers, users] = useLazyQuery<GetUsersDisabledQuery>(GET_USERS_DISABLED);

  const refreshTable = useRef(() => {});

  useEffect(() => {
    switch (type.value) {
      case COURSE: {
        loadCourses();
        break;
      }
      case EVENT: {
        loadEvents();
        break;
      }
      case GUARD: {
        loadGuards();
        break;
      }
      case USERS: {
        loadUsers();
        break;
      }
      case RANK: {
        loadRanks();
        break;
      }
      case SERVICE: {
        loadServices();
        break;
      }
      case TRAINING: {
        loadTrainings();
        break;
      }
      case VOLUNTEER: {
        loadVolunteers();
        break;
      }
    }
  }, [type]);

  const restoreColumn = {
    dataField: undefined,
    text: "Acciones",
    formatter: (cell, row) => (
      <Button
        className="btn-fill btn-sm"
        onClick={() => {
          switch (type.value) {
            case COURSE: {
              restoreCourse({ variables: { id: row.id } }).then(() => refreshTable.current());
              break;
            }
            case EVENT: {
              restoreEvent({ variables: { id: row.id } }).then(() => refreshTable.current());
              break;
            }
            case GUARD: {
              restoreGuard({ variables: { id: row.id } }).then(() => refreshTable.current());
              break;
            }
            case USERS: {
              restoreUser({ variables: { id: row.id } }).then(() => refreshTable.current());
              break;
            }
            case SERVICE: {
              restoreService({ variables: { id: row.id } }).then(() => refreshTable.current());
              break;
            }
            case TRAINING: {
              restoreTraining({ variables: { id: row.id } }).then(() => refreshTable.current());
              break;
            }
            case VOLUNTEER: {
              restoreVolunteer({ variables: { id: row.id } }).then(() => refreshTable.current());
              break;
            }
          }
        }}
      >
        Restaurar
      </Button>
    ),
  };

  let columns: ColumnDescription[] = [
    {
      dataField: "id",
      text: "Id",
    },
    restoreColumn,
  ];

  //let data = [];
  let query: DocumentNode;
  switch (type.value) {
    case COURSE: {
      columns = get_course_columns(restoreColumn);
      //data = courses.called && !courses.loading ? courses.data.coursesDisabled : [];
      query = GET_PAGINATED_COURSES;
      break;
    }
    case EVENT: {
      columns = get_event_columns(restoreColumn);
      //data = events.called && !events.loading ? events.data.eventsDisabled : [];
      query = GET_PAGINATED_EVENTS;
      break;
    }
    case GUARD: {
      columns = get_guard_columns(restoreColumn);
      //data = guards.called && !guards.loading ? guards.data.guardsDisabled : [];
      query = GET_PAGINATED_GUARDS;
      break;
    }
    case USERS: {
      columns = get_users_columns(restoreColumn);
      //data = users.called && !users.loading ? users.data.usersDisabled : [];
      query = GET_PAGINATED_USERS;
      break;
    }
    case SERVICE: {
      columns = get_service_columns(restoreColumn);
      //data = services.called && !services.loading ? services.data.servicesDisabled : [];
      query = GET_PAGINATED_SERVICES;
      break;
    }
    case TRAINING: {
      columns = get_training_columns(restoreColumn);
      //data = trainings.called && !trainings.loading ? trainings.data.trainingsDisabled : [];
      query = GET_PAGINATED_TRAININGS;
      break;
    }
    case VOLUNTEER: {
      columns = get_volunteer_columns(restoreColumn);
      //data = volunteers.called && !volunteers.loading ? volunteers.data.volunteersDisabled : [];
      query = GET_PAGINATED_VOLUNTEERS;
      break;
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title>
                <span className="h4">Papelera de Reciclaje</span>
                <div className="pull-right ml-2" style={{ display: "inline-flex" }}>
                  <Select value={type} onChange={setType} options={OPTIONS} />
                </div>
              </Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              <PagedTable
                keyField="id"
                query={query}
                columns={columns}
                disabled={true}
                refreshFunction={refreshTable}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecycleBinPage;
