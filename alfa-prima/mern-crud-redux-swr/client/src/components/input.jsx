export default function Input(prop) {
  return (
    <label className='block m-3 '>
      <span className='block text-sm font-medium text-slate-700 peer-invalid:text-pink-500'>
        {prop.name.at(0).toUpperCase() + prop.name.substring(1)}
      </span>
      <input
        id={prop.name}
        name={prop.name}
        type={prop.type || "text"}
        placeholder={prop.placeholder}
        required={prop.required}
        onChange={prop.onChange}
        value={prop.value}
        className='mt-1 peer block w-full px-3 py-2 bg-white border border-slate-300 rounded text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        invalid:border-pink-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500 '
      />
      <p className='mt-1 text-sm    text-pink-600 '>{prop.error?.msg}</p>
      <p className='mt-1 text-sm   hidden peer-invalid:block text-pink-600 '>
        invalid email address
      </p>
    </label>
  )
}
