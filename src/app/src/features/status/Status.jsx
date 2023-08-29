import { useGetStatusQuery } from '../../services/spacetraders';

export default function Status() {
    const { data, error, isLoading } = useGetStatusQuery();
    return (
        <div>
            <label htmlFor="textarea">Status Request</label>
            <textarea id="textarea" value={JSON.stringify(data, null, 2)} style={{ width: '100%', height: '50vh' }}></textarea>
        </div>
    );
}
