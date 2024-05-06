import { Col, Container, Row } from "react-bootstrap";
import { TopNav } from "../components/TopNav";
import { Footer } from "../components/Footer";
import { AuthComp } from "../components/AuthComp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NewTransForm } from "../components/NewTransForm";
import { TransactionTable } from "../components/TransactionTable";
import { fetchTrans } from "../helpers/axiosHelper";
import { toast } from "react-toastify";

const Dashboard = ({ loggedInUser }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getUserTransactions();
  }, []);

  const getUserTransactions = async () => {
    const { status, message, trans } = await fetchTrans();

    status === "error" ? toast.error(message) : setTransactions(trans);
  };

  return (
    <AuthComp loggedInUser={loggedInUser}>
      {/* header  */}
      <TopNav loggedInUser={loggedInUser} />
      {/* main body  */}
      <Container className="main pt-2">
        <h4>Dashboar | Welcome back {loggedInUser?.name}</h4>
        <hr />

        <NewTransForm getUserTransactions={getUserTransactions} />

        <Row className="mt-5">
          <Col>
            <TransactionTable transactions={transactions} />
          </Col>
        </Row>
      </Container>{" "}
      {/* footer  */}
      <Footer />
    </AuthComp>
  );
};

export default Dashboard;
