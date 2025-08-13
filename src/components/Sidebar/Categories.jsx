import { ListGroup, Badge } from 'react-bootstrap';
import { initialCategories } from '../../utils/constants';

export default function Categories({ events, onCategorySelect }) {
  return (
    <div className="mt-3">
      <h5>Categories</h5>
      <ListGroup>
        {initialCategories.map(category => (
          <ListGroup.Item 
            action 
            key={category.id}
            onClick={() => onCategorySelect(category)}
            style={{ cursor: 'pointer' }}
            className="d-flex justify-content-between align-items-center"
          >
            <span>{category.icon} {category.name}</span>
            <Badge bg={category.color}>
              {events.filter(e => e.category === category.name).length}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}