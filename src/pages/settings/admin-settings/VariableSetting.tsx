import CreateVariableType from './CreateVariableType'
import CreateVariable from './CreateVariable'
import VariablesTable from './VariablesTable'
import VariableTypeTable from './VariableTypeTable'

const VariableSetting = () => {
  return (
    <div className='flex flex-col gap-8'>
       <div className="grid md:grid-cols-2 gap-8">
       <CreateVariableType/>
       <CreateVariable/>
       </div>
       <VariablesTable/>
       <VariableTypeTable/>
    </div>
  )
}

export default VariableSetting