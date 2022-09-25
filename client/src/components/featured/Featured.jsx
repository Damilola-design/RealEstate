import useFetch from "../../hooks/useFetch";
import "./featured.css";

export const Featured = () => {

    const {data, loading, error} = useFetch("/hotels/countByCity?cities=Tanke,madrid,london")
  return (
    <div className="featured">
        {loading ? "Loading please wait" : ( <>
        <div className="featuredItem">
            <img src="https://cf.bstatic.com/xdata/images/city/540x270/674607.webp?k=aab4963b4ce1d2bf272e3cd1a70499c4ee6d62b2184a9b286714e94ca4f2b995&o=" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Tanke</h1>
                <h2>{data[0]} properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://cf.bstatic.com/xdata/images/city/540x270/613094.webp?k=f751e035ae2c0ac97263ed7d150bae607ffa17a88c55e81cec907941d6bb078b&o=" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Madrid</h1>
                <h2>{data[1]} properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://cf.bstatic.com/xdata/images/city/540x270/856674.webp?k=70a9589c2f7d2fc175c3ac02c55702c2e433f588866756a394cddfe215170f38&o=" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>New York</h1>
                <h2>{data[2]} properties</h2>
            </div>
        </div></>)}
    </div>
  )
}

export default Featured