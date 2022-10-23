import { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewProgressPresentation1Marks.css';
import './ViewProgressPresentation1Markscss2.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const ViewProgressPresentation1Marks = ({ history }) => {
  const [error, setError] = useState('');
  const [privateData, setPrivateData] = useState('');
  //newly added
  const [progresspresentation1marks, setprogresspresentation1marks] =
    useState('');

  const [
    fetchProgressPresentation1MarksData,
    setProgressPresentation1MarksData,
  ] = useState('');

  const [provengapmarks1, setprovengapmarks1] = useState('');
  const [provengapmarks2, setprovengapmarks2] = useState('');
  const [capabilitymarks1, setcapabilitymarks1] = useState('');
  const [capabilitymarks2, setcapabilitymarks2] = useState('');
  const [implementationmarks1, setimplementationmarks1] = useState('');
  const [implementationmarks2, setimplementationmarks2] = useState('');
  const [implementationmarks3, setimplementationmarks3] = useState('');
  const [implementationmarks4, setimplementationmarks4] = useState('');
  const [implementationmarks5, setimplementationmarks5] = useState('');
  const [communicationmarks1, setcommunicationmarks1] = useState('');
  const [communicationmarks2, setcommunicationmarks2] = useState('');
  const [commercializationmarks, setcommercializationmarks] = useState('');

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
      try {
        const { data } = await axios.get('/api/private', config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem('authToken');
        setError('You are not authorized please login');
      }
    };

    const fetchProgressPresentation1MarksData = async () => {
      const viewprogresspresentation1marksconfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };

      try {
        const { data } = await axios.get(
          '/api/ViewMarks/viewprogresspresentation1marks',
          viewprogresspresentation1marksconfig
        );
        const viewprogresspresentation1marksArray = data.data;
        //setProgressPresentation1MarksData(viewprogresspresentation1marksArray[0]);
        //newly added
        // console.log(viewprogresspresentation1marksArray)
        // const viewprogresspresentation1marks1=viewprogresspresentation1marksArray[0].split(",")
        setprogresspresentation1marks(viewprogresspresentation1marksArray);
        setprovengapmarks1(viewprogresspresentation1marksArray.provengapmarks1);
        setprovengapmarks2(viewprogresspresentation1marksArray.provengapmarks2);
        setcapabilitymarks1(
          viewprogresspresentation1marksArray.capabilitymarks1
        );
        setcapabilitymarks2(
          viewprogresspresentation1marksArray.capabilitymarks2
        );
        setimplementationmarks1(
          viewprogresspresentation1marksArray.implementationmarks1
        );
        setimplementationmarks2(
          viewprogresspresentation1marksArray.implementationmarks2
        );
        setimplementationmarks3(
          viewprogresspresentation1marksArray.implementationmarks3
        );
        setimplementationmarks4(
          viewprogresspresentation1marksArray.implementationmarks4
        );
        setimplementationmarks5(
          viewprogresspresentation1marksArray.implementationmarks5
        );
        setcommunicationmarks1(
          viewprogresspresentation1marksArray.communicationmarks1
        );
        setcommunicationmarks2(
          viewprogresspresentation1marksArray.communicationmarks2
        );
        setcommercializationmarks(
          viewprogresspresentation1marksArray.commercializationmarks
        );
      } catch (error) {}
    };
    fetchProgressPresentation1MarksData();

    fetchPrivateDate();
  }, [history]);

  //logout feature
  const logOutHandler = () => {
    localStorage.removeItem('authToken');
    history.push('/login');
  };

  return error ? (
    <span className='error-message'>{error}</span>
  ) : (
    <>
      <div id='back'>
        <Header />
        <p style={{ color: '#FFF', textAlign: 'right' }}>
          {privateData}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={logOutHandler} id='logout'>
            Log out
          </button>
        </p>

        <p style={{ color: '#FFF' }}>
          <br />
          <br />
          <br />
          <br />
        </p>
        {/* Added by pasindu vinod */}
        <div className='lg:w-2/3 px-8 py-6 bg-gray-800 rounded-lg shadow-md mt-6 ml-80 h-auto text-white text-serif'>
          <h1 id='caption'>Your Progress Presentation 1 marks are</h1>
          <br />
          <hr id='hr'></hr>
          <table className='mt-5 lg:w-4/5 m-auto border-none'>
            <tr className='py-3 border-b hover:bg-gray-600'>
              <td className='py-3 border-none text-left pl-16'>
                Proven gap marks 1
              </td>
              <td className='py-3 border-none text-left pl-16'>
                {provengapmarks1}
              </td>
            </tr>
            <tr className='py-3 border-b hover:bg-gray-600'>
              <td className='py-3 border-none text-left pl-16'>
                Proven gap marks 2
              </td>
              <td className='py-3 border-none text-left pl-16'>
                {provengapmarks2}
              </td>
            </tr>
            <tr className='py-3 border-b hover:bg-gray-600'>
              <td className='py-3 border-none text-left pl-16'>
                Capability marks 1
              </td>
              <td className='py-3 border-none text-left pl-16'>
                {capabilitymarks1}
              </td>
            </tr>
            <tr className='py-3 border-b hover:bg-gray-600'>
              <td className='py-3 border-none text-left pl-16'>
                Capability marks 2
              </td>
              <td className='py-3 border-none text-left pl-16'>
                {capabilitymarks2}
              </td>
            </tr>
            <tr className='py-3 border-b hover:bg-gray-600'>
              <td className='py-3 border-none text-left pl-16'>
                Implementation marks 1
              </td>
              <td className='py-3 border-none text-left pl-16'>
                {implementationmarks1}
              </td>
            </tr>
            <tr className='py-3 border-b hover:bg-gray-600'>
              <td className='py-3 border-none text-left pl-16'>
                Implementation marks 2
              </td>
              <td className='py-3 border-none text-left pl-16'>
                {implementationmarks2}
              </td>
            </tr>
            <tr className='py-3 border-b hover:bg-gray-600'>
              <td className='py-3 border-none text-left pl-16'>
                Implementation marks 3
              </td>
              <td className='py-3 border-none text-left pl-16'>
                {implementationmarks3}
              </td>
            </tr>
            <tr className='py-3 border-b hover:bg-gray-600'>
              <td className='py-3 border-none text-left pl-16'>
                Implementation marks 4
              </td>
              <td className='py-3 border-none text-left pl-16'>
                {implementationmarks4}
              </td>
            </tr>
            <tr className='py-3 border-b hover:bg-gray-600'>
              <td className='py-3 border-none text-left pl-16'>
                Implementation marks 5
              </td>
              <td className='py-3 border-none text-left pl-16'>
                {implementationmarks5}
              </td>
            </tr>
            <tr className='py-3 border-b hover:bg-gray-600'>
              <td className='py-3 border-none text-left pl-16'>
                Communication marks 1
              </td>
              <td className='py-3 border-none text-left pl-16'>
                {communicationmarks1}
              </td>
            </tr>
            <tr className='py-3 border-b hover:bg-gray-600'>
              <td className='py-3 border-none text-left pl-16'>
                Communication marks 1
              </td>
              <td className='py-3 border-none text-left pl-16'>
                {communicationmarks2}
              </td>
            </tr>
            <tr className='py-3 border-b hover:bg-gray-600'>
              <td className='py-3 border-none text-left pl-16'>
                Commercialization marks
              </td>
              <td className='py-3 border-none text-left pl-16'>
                {commercializationmarks}
              </td>
            </tr>
          </table>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default ViewProgressPresentation1Marks;
